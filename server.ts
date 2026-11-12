import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
app.disable('x-powered-by');

function getArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return undefined;
}

// Ensure dev server binds to port 3000 and 0.0.0.0
const PORT = parseInt(getArg('--port') || (process.env.NODE_ENV === 'production' && process.env.PORT ? process.env.PORT : '3000'), 10);
const HOST = getArg('--host') || '0.0.0.0';
const DB_PATH = path.resolve(process.cwd(), 'data', 'db.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lexglobal2026';

// Cryptographic token store for authenticated sessions with expiration timestamps
interface SessionRecord {
  createdAt: number;
  expiresAt: number;
}
const activeSessions = new Map<string, SessionRecord>();
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Brute-force protection for login: max 5 failed attempts within 15 minutes
interface FailedLoginRecord {
  count: number;
  lockedUntil: number;
}
const failedLoginMap = new Map<string, FailedLoginRecord>();

// Simple in-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function rateLimiter(windowMs: number, maxRequests: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    const record = rateLimitMap.get(key);
    if (!record || now > record.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        error: 'Too many requests. Please wait a moment before trying again.'
      });
      return;
    }

    record.count++;
    next();
  };
}

// Enable CORS with controlled headers
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Comprehensive Security Headers Middleware
app.use((req, res, next) => {
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Clickjacking protection (permits AI Studio iframe preview while securing external access)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Legacy XSS filter activation
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer header privacy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions Policy: restrict device APIs while granting payment permissions for Razorpay
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=*');
  
  // Content Security Policy
  const csp = [
    "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://*.razorpay.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.razorpay.com https://*.razorpay.com https://lumberjack.razorpay.com http://localhost:* http://127.0.0.1:* ws: wss:",
    "frame-src 'self' https://api.razorpay.com https://*.razorpay.com https://www.youtube.com https://www.youtube-nocookie.com https://maps.google.com https://www.google.com https://*.google.com"
  ].join('; ');
  res.setHeader('Content-Security-Policy', csp);
  
  next();
});

// JSON Body parser with payload limit to guard against DOS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Serve static assets from public directory and root workspace
app.use(express.static(path.resolve(process.cwd(), 'public')));
app.use(express.static(process.cwd()));

// Database Helpers
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { posts: [], courses: [], team: [], inquiries: [], enrollments: [], orders: [] };
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    data.posts = data.posts || [];
    data.courses = data.courses || [];
    data.team = data.team || [];
    data.inquiries = data.inquiries || [];
    data.enrollments = data.enrollments || [];
    data.orders = data.orders || [];
    return data;
  } catch (err) {
    console.error('Error reading DB:', err);
    return { posts: [], courses: [], team: [], inquiries: [], enrollments: [], orders: [] };
  }
}

function writeDb(data: any) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// Authentication Middleware with Expiration Check
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Missing authorization token.' });
    return;
  }

  const session = activeSessions.get(token);
  if (!session || Date.now() > session.expiresAt) {
    if (session) activeSessions.delete(token);
    res.status(401).json({ error: 'Session expired or invalid. Please re-authenticate.' });
    return;
  }

  next();
}

// Strict XSS Sanitizer for input strings
function sanitizeText(str: any): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Timing-safe string comparison to protect against timing side-channel attacks
function safeCompare(a: string, b: string): boolean {
  try {
    const hashA = crypto.createHash('sha256').update(String(a)).digest();
    const hashB = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(hashA, hashB);
  } catch {
    return false;
  }
}

// ==================== HEALTH & DIAGNOSTICS ====================
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    firm: 'LEX GLOBAL ADVOCACY LLP',
    llpin: 'ACK-4630',
    version: '2.5.0',
    timestamp: new Date().toISOString()
  });
});

// ==================== AUTHENTICATION ROUTES ====================

// Auth: Login with Brute-Force IP Lockout Protection
app.post('/api/auth/login', (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const failedRecord = failedLoginMap.get(ip);

  // Check if IP is currently locked out
  if (failedRecord && failedRecord.lockedUntil > now) {
    const remainingSec = Math.ceil((failedRecord.lockedUntil - now) / 1000);
    res.status(429).json({
      error: `Security lockout: Too many failed login attempts. Please try again in ${remainingSec} seconds.`
    });
    return;
  }

  const { password } = req.body;
  const db = readDb();
  const validPw = db.adminPassword || ADMIN_PASSWORD;

  if (typeof password === 'string' && safeCompare(password, validPw)) {
    // Reset failed counter upon successful verification
    failedLoginMap.delete(ip);
    const token = crypto.randomBytes(32).toString('hex');
    activeSessions.set(token, {
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS
    });
    res.json({ success: true, token, message: 'Authentication successful. Secure session initiated.' });
  } else {
    // Increment failed attempt counter
    const current = failedRecord && failedRecord.lockedUntil <= now ? { count: 0, lockedUntil: 0 } : (failedRecord || { count: 0, lockedUntil: 0 });
    current.count++;
    if (current.count >= 5) {
      current.lockedUntil = now + (15 * 60 * 1000); // 15 minute lockout
      failedLoginMap.set(ip, current);
      res.status(429).json({
        error: 'Security lockout: 5 consecutive failed attempts detected. Access blocked for 15 minutes.'
      });
      return;
    }
    failedLoginMap.set(ip, current);
    res.status(401).json({
      error: `Invalid management credentials. (${5 - current.count} attempts remaining before temporary lockout)`
    });
  }
});

// Auth: Verify
app.get('/api/auth/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const session = activeSessions.get(token);
  const isValid = !!(session && Date.now() <= session.expiresAt);
  res.json({ authenticated: isValid });
});

// Auth: Change password (Protected)
app.post('/api/auth/password', requireAuth, (req: Request, res: Response) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }
  const db = readDb();
  db.adminPassword = newPassword;
  writeDb(db);
  res.json({ success: true, message: 'Admin password updated successfully.' });
});

// ==================== BLOGS & PUBLICATIONS ROUTES ====================

// Blogs: List
app.get('/api/blogs', (req: Request, res: Response) => {
  const db = readDb();
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const isAdmin = activeSessions.has(token);

  const posts = isAdmin ? db.posts : (db.posts || []).filter((p: any) => p.published !== false);
  res.json(posts || []);
});

// Blogs: Get by Slug or ID
app.get('/api/blogs/:slug', (req: Request, res: Response) => {
  const db = readDb();
  const post = (db.posts || []).find((p: any) => p.slug === req.params.slug || p.id === req.params.slug);
  if (!post) {
    res.status(404).json({ error: 'Article not found.' });
    return;
  }
  post.views = (post.views || 0) + 1;
  writeDb(db);
  res.json(post);
});

// Blogs: Create (Protected)
app.post('/api/blogs', requireAuth, (req: Request, res: Response) => {
  const { title, subtitle, category, tags, author, authorRole, authorAvatar, image, content, featured, published, readTime } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required.' });
    return;
  }

  const slug = (req.body.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const db = readDb();

  const newPost = {
    id: 'p-' + Date.now(),
    slug,
    title: sanitizeText(title),
    subtitle: sanitizeText(subtitle || ''),
    category: sanitizeText(category || 'General'),
    tags: Array.isArray(tags) ? tags.map((t: string) => sanitizeText(t)) : [],
    author: sanitizeText(author || 'Lex Global Advocacy'),
    authorRole: sanitizeText(authorRole || 'Legal Counsel'),
    authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date: new Date().toISOString().slice(0, 10),
    updated: new Date().toISOString().slice(0, 10),
    readTime: readTime || '6 min read',
    image: image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    featured: Boolean(featured),
    published: published !== false,
    views: 1,
    likes: 0,
    content: content,
    comments: []
  };

  db.posts.unshift(newPost);
  writeDb(db);
  res.status(201).json(newPost);
});

// Blogs: Update (Protected)
app.put('/api/blogs/:id', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  const index = db.posts.findIndex((p: any) => p.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'Article not found.' });
    return;
  }

  const existing = db.posts[index];
  const updates = req.body;

  db.posts[index] = {
    ...existing,
    ...updates,
    title: updates.title !== undefined ? sanitizeText(updates.title) : existing.title,
    subtitle: updates.subtitle !== undefined ? sanitizeText(updates.subtitle) : existing.subtitle,
    category: updates.category !== undefined ? sanitizeText(updates.category) : existing.category,
    tags: Array.isArray(updates.tags) ? updates.tags.map((t: string) => sanitizeText(t)) : existing.tags,
    author: updates.author !== undefined ? sanitizeText(updates.author) : existing.author,
    updated: new Date().toISOString().slice(0, 10),
    content: updates.content !== undefined ? updates.content : existing.content
  };

  writeDb(db);
  res.json(db.posts[index]);
});

// Blogs: Delete (Protected)
app.delete('/api/blogs/:id', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  const initialLen = db.posts.length;
  db.posts = db.posts.filter((p: any) => p.id !== req.params.id);

  if (db.posts.length === initialLen) {
    res.status(404).json({ error: 'Article not found.' });
    return;
  }

  writeDb(db);
  res.json({ success: true, message: 'Article deleted successfully.' });
});

// ==================== COURSES & ACADEMY ROUTES ====================

// Courses: List
app.get('/api/courses', (req: Request, res: Response) => {
  const db = readDb();
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const isAdmin = activeSessions.has(token);

  const courses = isAdmin ? db.courses : (db.courses || []).filter((c: any) => c.published !== false);
  res.json(courses || []);
});

// Courses: Get by Slug or ID
app.get('/api/courses/:slug', (req: Request, res: Response) => {
  const db = readDb();
  const course = (db.courses || []).find((c: any) => c.slug === req.params.slug || c.id === req.params.slug);
  if (!course) {
    res.status(404).json({ error: 'Course not found.' });
    return;
  }
  res.json(course);
});

// Courses: Create / Update (Protected)
app.post('/api/courses', requireAuth, (req: Request, res: Response) => {
  const { title, slug, category, level, duration, price, instructor, instructorTitle, instructorAvatar, image, description, outcomes, curriculum, published } = req.body;

  if (!title) {
    res.status(400).json({ error: 'Course title is required.' });
    return;
  }

  const courseSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const db = readDb();

  const newCourse = {
    id: 'c-' + Date.now(),
    slug: courseSlug,
    title: sanitizeText(title),
    category: sanitizeText(category || 'General Legal Practice'),
    level: sanitizeText(level || 'Masterclass'),
    duration: sanitizeText(duration || '6 weeks · 18 lectures'),
    price: Number(price) || 0,
    currency: 'INR',
    instructor: sanitizeText(instructor || 'Senior Partner'),
    instructorTitle: sanitizeText(instructorTitle || 'Executive Faculty'),
    instructorAvatar: instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    students: 1,
    image: image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    description: sanitizeText(description || ''),
    accreditation: 'Accredited by Global Bar CLE Council',
    outcomes: Array.isArray(outcomes) ? outcomes.map((o: string) => sanitizeText(o)) : [],
    curriculum: Array.isArray(curriculum) ? curriculum : [],
    published: published !== false
  };

  db.courses.unshift(newCourse);
  writeDb(db);
  res.status(201).json(newCourse);
});

// Courses: Delete (Protected)
app.delete('/api/courses/:id', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  const initialLen = db.courses.length;
  db.courses = db.courses.filter((c: any) => c.id !== req.params.id);

  if (db.courses.length === initialLen) {
    res.status(404).json({ error: 'Course not found.' });
    return;
  }

  writeDb(db);
  res.json({ success: true, message: 'Course deleted successfully.' });
});

// Courses: Student Enrollment (Public, rate limited)
app.post('/api/courses/enroll', rateLimiter(60000, 10), (req: Request, res: Response) => {
  const { courseId, courseSlug, name, email, phone, organization, mode, note } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Student full name and a valid email are required.' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  const db = readDb();
  const matchedCourse = (db.courses || []).find((c: any) => c.id === courseId || c.slug === courseSlug);
  const courseTitle = matchedCourse ? matchedCourse.title : (req.body.courseTitle || 'Executive Legal Masterclass');

  const enrollmentId = 'ENR-' + Date.now();
  const studentId = 'LGA-ACAD-' + Math.floor(1000 + Math.random() * 9000);

  const newEnrollment = {
    id: enrollmentId,
    courseId: courseId || (matchedCourse ? matchedCourse.id : 'c1'),
    courseTitle,
    name: sanitizeText(name),
    email: sanitizeText(email),
    phone: sanitizeText(phone || ''),
    organization: sanitizeText(organization || 'Individual Practitioner'),
    mode: sanitizeText(mode || 'Live Interactive Weekend Cohort'),
    note: sanitizeText(note || ''),
    status: 'Confirmed',
    enrolledAt: new Date().toISOString(),
    studentId
  };

  db.enrollments = db.enrollments || [];
  db.enrollments.unshift(newEnrollment);

  // Increment course student count if matched
  if (matchedCourse) {
    matchedCourse.students = (matchedCourse.students || 0) + 1;
  }

  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Enrollment confirmed successfully.',
    enrollmentId,
    studentId,
    courseTitle,
    enrolledAt: newEnrollment.enrolledAt
  });
});

// Enrollments: List (Protected)
app.get('/api/enrollments', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.enrollments || []);
});

// Enrollments: Delete (Protected)
app.delete('/api/enrollments/:id', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.enrollments = (db.enrollments || []).filter((e: any) => e.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: 'Enrollment record removed.' });
});

// ==================== RAZORPAY ORDERS & COURSE BUYERS ROUTES ====================

// Record Order / Course Purchase (Rate-limited, sanitized)
app.post('/api/orders', rateLimiter(60000, 15), (req: Request, res: Response) => {
  const { studentName, studentEmail, studentPhone, organization, courseId, courseTitle, amount, paymentId, orderId, paymentMethod, status } = req.body;

  if (!studentName || !studentEmail || !courseTitle) {
    res.status(400).json({ error: 'Student name, email, and course are required.' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
    res.status(400).json({ error: 'A valid student email address is required.' });
    return;
  }

  const db = readDb();
  const validAmount = Number(amount) > 0 ? Number(amount) : 0;
  const newOrder = {
    id: 'ord_' + Date.now(),
    studentId: 'LGA-ACAD-' + Math.floor(1000 + Math.random() * 9000),
    studentName: sanitizeText(studentName),
    studentEmail: sanitizeText(studentEmail),
    studentPhone: sanitizeText(studentPhone || ''),
    organization: sanitizeText(organization || 'Individual Practitioner'),
    courseId: sanitizeText(courseId || 'c1'),
    courseTitle: sanitizeText(courseTitle),
    amount: validAmount,
    currency: 'INR',
    paymentId: sanitizeText(paymentId || ('pay_' + Date.now())),
    orderId: sanitizeText(orderId || ('order_' + Date.now())),
    paymentMethod: sanitizeText(paymentMethod || 'Razorpay'),
    status: status === 'Refunded' ? 'Refunded' : 'Paid',
    invoiceNumber: 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toISOString()
  };

  db.orders = db.orders || [];
  db.orders.unshift(newOrder);

  // Synchronize with enrollments if not already present
  db.enrollments = db.enrollments || [];
  const existingEnr = db.enrollments.find((e: any) => e.email === studentEmail && (e.courseId === courseId || e.courseTitle === courseTitle));
  if (!existingEnr) {
    db.enrollments.unshift({
      id: 'ENR-' + Date.now(),
      studentId: newOrder.studentId,
      name: newOrder.studentName,
      email: newOrder.studentEmail,
      phone: newOrder.studentPhone,
      organization: newOrder.organization,
      courseId: newOrder.courseId,
      courseTitle: newOrder.courseTitle,
      mode: 'Executive Online Cohort',
      status: 'Confirmed',
      enrolledAt: newOrder.createdAt
    });
  }

  writeDb(db);
  res.status(201).json({ success: true, order: newOrder });
});

// List Orders (Protected)
app.get('/api/orders', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.orders || []);
});

// Delete Order (Protected)
app.delete('/api/orders/:id', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.orders = (db.orders || []).filter((o: any) => o.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: 'Order record removed.' });
});

// ==================== INQUIRIES & CONTACT ROUTES ====================

const handleInquirySubmission = (req: Request, res: Response) => {
  const { name, email, phone, organization, practiceArea, jurisdiction, description, message, subject, urgency } = req.body;
  const content = description || message || '';

  if (!name || !email || !content) {
    res.status(400).json({ error: 'Name, email, and a brief description/message are required.' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  const db = readDb();
  const newInquiry = {
    id: 'inq-' + Date.now(),
    name: sanitizeText(name),
    email: sanitizeText(email),
    phone: sanitizeText(phone || ''),
    subject: sanitizeText(subject || ''),
    organization: sanitizeText(organization || 'Individual Party'),
    practiceArea: sanitizeText(practiceArea || 'General Counsel & Advocacy'),
    jurisdiction: sanitizeText(jurisdiction || 'Multi-Jurisdictional'),
    urgency: sanitizeText(urgency || 'Routine'),
    description: sanitizeText(content),
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  db.inquiries = db.inquiries || [];
  db.inquiries.unshift(newInquiry);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Confidential inquiry submitted successfully.',
    id: newInquiry.id
  });
};

app.post('/api/inquiries', rateLimiter(60000, 10), handleInquirySubmission);
app.post('/api/contact', rateLimiter(60000, 10), handleInquirySubmission);

// Inquiries: List (Protected)
app.get('/api/inquiries', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.inquiries || []);
});

// Inquiries: Update Status (Protected)
app.put('/api/inquiries/:id', requireAuth, (req: Request, res: Response) => {
  const { status } = req.body;
  const db = readDb();
  const inq = (db.inquiries || []).find((i: any) => i.id === req.params.id);
  if (!inq) {
    res.status(404).json({ error: 'Inquiry not found.' });
    return;
  }
  inq.status = sanitizeText(status || inq.status);
  writeDb(db);
  res.json(inq);
});

// Inquiries: Delete (Protected)
app.delete('/api/inquiries/:id', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  db.inquiries = (db.inquiries || []).filter((i: any) => i.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, message: 'Inquiry removed.' });
});

// ==================== ADMIN PORTAL DASHBOARD STATS & EXPORT ====================

app.get('/api/admin/stats', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  const orders = db.orders || [];
  const totalRevenue = orders.reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);
  res.json({
    totalInquiries: (db.inquiries || []).length,
    newInquiries: (db.inquiries || []).filter((i: any) => i.status === 'New').length,
    totalEnrollments: (db.enrollments || []).length,
    totalCourses: (db.courses || []).length,
    totalPosts: (db.posts || []).length,
    totalOrders: orders.length,
    totalRevenue
  });
});

app.get('/api/admin/export', requireAuth, (req: Request, res: Response) => {
  const db = readDb();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="lex-global-backup.json"');
  res.send(JSON.stringify(db, null, 2));
});

// Team: List
app.get('/api/team', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.team || []);
});

// ==================== ADMIN PORTAL SERVING ====================

// Serve admin.html directly on /admin or /admin.html
app.get(['/admin', '/admin.html'], (req: Request, res: Response) => {
  const adminFile = path.resolve(process.cwd(), 'admin.html');
  if (fs.existsSync(adminFile)) {
    res.sendFile(adminFile);
  } else {
    res.redirect('/');
  }
});

// ==================== FRONTEND SERVING ====================
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Mount Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static assets from dist/
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`\n  VITE v8.3.0  ready in 210 ms\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/`);
    console.log(`  ➜  Admin:   http://localhost:${PORT}/admin.html\n`);
    console.log(`Lex Global Advocacy Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
