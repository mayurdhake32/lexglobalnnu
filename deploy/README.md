# LEX GLOBAL ADVOCACY LLP — Complete Deployment & Operations Manual
**Firm Registration:** LLPIN ACK-4630, Mumbai & Savannah &middot; 42+ Global Arbitral Seats

This package contains the complete, production-grade codebase for **LEX GLOBAL ADVOCACY LLP** with separated **Frontend** and **Backend** directories, fully functional **Courses & Academy Masterclasses**, **The Legal Hub & Publications**, and an authenticated **Partner & Staff Admin Portal**.

---

## 📁 Separated Directory Architecture

```
deploy/
├── frontend/                     # Pure Static Client (No Node.js build required)
│   ├── index.html                # Main portal: Hero, Practices, Academy, Blog, Intake
│   ├── admin.html                # Partner & Staff Executive Admin Portal
│   └── README.md                 # Frontend hosting guide (Vercel, Netlify, Cloudflare)
│
├── backend/                      # Production REST API Service (Node.js + Express)
│   ├── server.js                 # Express API server with CORS, Rate Limiting & Auth
│   ├── package.json              # Backend dependencies (express, cors, dotenv)
│   ├── .env.example              # Environment variables template
│   ├── Dockerfile                # 1-click Docker container deployment
│   ├── data/
│   │   └── db.json               # Persistent JSON database (courses, blogs, inquiries)
│   └── README.md                 # Backend hosting guide (Render, Railway, VPS)
│
└── README.md                     # Master Operations & Deployment Guide (This file)
```

---

## 🎓 New Section: Legal Academy & Executive Masterclasses

The website now features a fully functional **Courses & Academy** section (`#courses`) designed for practitioners, corporate counsel, and scholars:

1. **International Commercial Arbitration: Strategy & Award Enforcement**
   - *Faculty:* Dr. Amara Okonkwo (Arbitrator on LCIA, SIAC & ICC Panels)
   - *Duration & Credits:* 8 weeks &middot; 24 lectures &middot; 16 CLE Credits
   - *Curriculum Highlights:* New York Convention 1958 Article V defenses, emergency arbitrator injunctions, IBA evidentiary schedules, cross-border asset attachment.

2. **Cross-Border Contract Drafting, Joint Ventures & Risk Allocation**
   - *Faculty:* Adv. Priya Menon (Partner, Cross-Border M&A Practice)
   - *Duration & Credits:* 6 weeks &middot; 18 lectures &middot; 12 CLE Credits
   - *Curriculum Highlights:* Common law vs civil law indemnities, deadlock mechanisms (Russian Roulette & Texas Shootout), Incoterms 2020 harmonisation.

3. **Global Data Privacy, GDPR & India DPDP Act 2023 Masterclass**
   - *Faculty:* Dr. Sofia Lindqvist (Head of Data & Privacy, Former EU Regulatory Counsel)
   - *Duration & Credits:* 7 weeks &middot; 21 lectures &middot; 14 CPD Credits
   - *Curriculum Highlights:* Transfer Impact Assessments (TIAs) post-Schrems II, EU AI Act compliance, 72-hour mandatory breach command unit.

4. **Admiralty Practice, Ship Arrests & Maritime Liens**
   - *Faculty:* Kathleen Horne (Partner, Admiralty Practice)
   - *Duration & Credits:* 6 weeks &middot; 18 lectures &middot; 12 CLE Credits
   - *Curriculum Highlights:* 1952 & 1999 Arrest Conventions, caveats & ex parte warrants, sister-ship arrest doctrines, P&I Club Letters of Undertaking.

5. **Real Estate Title Diligence, Commercial Conveyancing & MahaRERA**
   - *Faculty:* B. H. Levy, Jr. (Senior Counsel, Real Estate Practice)
   - *Duration & Credits:* 8 weeks &middot; 24 lectures &middot; 16 CLE Credits
   - *Curriculum Highlights:* 30-to-50-year chain of title review, 7/12 extracts & mutation registers, NA conversions, MahaRERA complaints & deemed conveyances.

6. **The Art of Appellate Advocacy & Plain-Language Legal Drafting**
   - *Faculty:* Margaret W.S. Puccini (Senior Managing Partner & Appellate Counsel)
   - *Duration & Credits:* 5 weeks &middot; 15 lectures &middot; 10 CLE Credits
   - *Curriculum Highlights:* Eliminating legalese, Bottom-Line-Up-Front (BLUF) persuasive structure, Question Presented framing, oral bench pivoting.

### Interactive Features:
- **Filter Tabs:** Instant category filtering across Arbitration, Contracts, Privacy, Maritime, Real Estate, and Advocacy.
- **Curriculum Modal:** Interactive breakdown of modules, lesson topics, lecture duration, format (video, lab, drafting workshop), and learning outcomes.
- **Live Enrollment Application:** Instant registration form capturing candidate details, preferred track (*Live Interactive Weekend Cohort* vs *Executive Self-Paced*), and generating an **Official Student Admission Pass** with unique Registration ID (`LGA-ACAD-XXXX`).

---

## 🔐 How to Access the Admin Portal in Deployed Website

### 1. Direct URL Path
On your deployed domain, navigate directly to:
```
https://your-domain.com/admin.html
```
*(Or `https://your-domain.com/admin` if deploying on Node.js/Express).*

### 2. Header and Footer Shortcuts
- **Header:** Click the discreet **Portal** button with shield icon on the top right navigation bar.
- **Footer:** Click the **Partner / Staff Portal** link in the copyright footer.

### 3. Login Credentials
- **Username:** `admin`
- **Master Password:** `lexglobal2026`
*(You can customize this password anytime in the **Security & Backups** tab or via the `ADMIN_PASSWORD` environment variable).*

### 4. Admin Portal Capabilities
- **Overview Dashboard:** Live KPI counters for total client inquiries, enrolled candidates, active courses, and publications.
- **Client Inquiries & Retainers:** View, search, and filter privileged consultation intakes. Change status (*New*, *Under Review*, *Cleared*) and click **Export CSV** to download client records.
- **Courses & Academy Manager:** View enrolled practitioners per masterclass, add new executive courses with custom syllabi, and manage tuition fees.
- **Publications & Blogs Manager:** Create new scholarly articles with rich content, read times, and tags; edit or draft posts.
- **Security & Backups:** Update master administrator password and click **Download db.json Backup** to export an offline snapshot of the database.

---

## 🚀 Step-by-Step Deployment Instructions

### Method A: Separated Deployment (Frontend on Vercel / Netlify + Backend on Render / Railway)

This is the recommended modern architecture.

#### Step 1: Deploy Backend (Render.com)
1. Push `deploy/backend/` to a GitHub repository.
2. Sign in to [Render.com](https://render.com) and click **New +** &rarr; **Web Service**.
3. Select your repository.
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add Environment Variables:
   - `ADMIN_PASSWORD`: `your_secure_admin_password`
   - `CORS_ORIGIN`: `*`
7. Click **Create Web Service**. Note your backend URL (e.g. `https://lex-backend.onrender.com`).

#### Step 2: Configure & Deploy Frontend (Vercel or Netlify)
1. Open `deploy/frontend/index.html` and `deploy/frontend/admin.html`.
2. Locate the line near the start of the `<script>` tag:
   ```javascript
   window.LEX_API_URL = window.LEX_API_URL || '';
   ```
   Set it to your Render backend URL:
   ```javascript
   window.LEX_API_URL = 'https://lex-backend.onrender.com';
   ```
3. Drag and drop the `deploy/frontend` folder to [Vercel](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop).
4. Your website is live!

---

### Method B: Unified 1-Click Deployment (Single Node.js Host)

If you prefer running frontend and backend together under a single domain:

1. Copy `index.html` and `admin.html` from `deploy/frontend/` into a `public/` folder inside `deploy/backend/`.
2. In `deploy/backend/server.js`, add:
   ```javascript
   app.use(express.static(path.join(__dirname, 'public')));
   app.get(['/admin', '/admin.html'], (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
   app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
   ```
3. Deploy the backend folder to Render, Railway, DigitalOcean App Platform, or Heroku.
4. Your entire website and admin portal will be served on the root URL.

---

### Method C: Traditional VPS (Ubuntu Linux / Nginx / PM2)

1. Connect to your VPS via SSH:
   ```bash
   ssh root@your-server-ip
   ```
2. Clone your files to `/var/www/lex-global/`.
3. In `backend/`, install packages and start the background daemon:
   ```bash
   cd /var/www/lex-global/deploy/backend
   npm install --production
   pm2 start server.js --name "lex-api"
   pm2 save
   ```
4. Configure Nginx to serve the `frontend/` folder statically on port 80/443 and proxy `/api` requests to `http://127.0.0.1:5000`.

---

## 🔐 Admin Portal Access & Credentials

### 1. Direct Access URLs
On your deployed Netlify website or custom domain, navigate to:
```
https://your-domain.netlify.app/admin.html
```
*(Also configured via Netlify rewrites at `/admin` and `/portal`).*

### 2. Login Credentials
- **Administrative Username:** `admin` (or `partner`)
- **Master Admin Password:** `lexglobal2026`
*(You can customize this password anytime in the **Security & Backups** tab or via the `ADMIN_PASSWORD` environment variable).*

---

## 🛡️ Enterprise-Grade Security Architecture ("Whole Website Secure")

Both the frontend and backend are hardened according to modern OWASP security standards:

1. **Content Security Policy (CSP)**
   - Embedded both in HTTP response headers (`netlify.toml`, `_headers`, Express middleware) and `<meta http-equiv="Content-Security-Policy">`.
   - Restricts executable scripts strictly to `'self'`, Razorpay SDK (`https://checkout.razorpay.com`, `https://*.razorpay.com`), Google Fonts, and verified CDN assets (cdnjs, jsdelivr).
   - Blocks unauthorized third-party trackers, unauthorized websocket connections, and remote script injection.

2. **Brute-Force & Credential Stuffing Defense**
   - **Backend:** Rate-limited to max 5 failed attempts per 15 minutes per IP address. Exceeding triggers a temporary security lockout with HTTP 429.
   - **Frontend:** Client-side counter tracks consecutive failures; 5 failed logins locks the authentication button for 5 minutes with a live countdown display.
   - **Timing-Safe Authentication:** Passwords are verified on the backend using `crypto.timingSafeEqual` with SHA-256 hashes, eliminating side-channel timing attacks.

3. **Session Lifecycle & Inactivity Timeout**
   - Cryptographically randomized 256-bit bearer tokens (`crypto.randomBytes(32)`).
   - Automatic logout after **30 minutes of inactivity** (monitors mouse movements, keystrokes, and touch events) to protect unattended workstations.
   - Session tokens expire automatically on the server after 12 hours.

4. **Spreadsheet / CSV Formula Injection Sanitization**
   - Protects corporate spreadsheet users (Excel, Google Sheets, LibreOffice).
   - When exporting inquiries or course buyer orders to CSV, cells starting with formula triggers (`=`, `+`, `-`, `@`, `\t`, `\r`) are automatically escaped with a leading single quote (`'`), preventing malicious formula execution.

5. **Defense-in-Depth XSS & Prototype Pollution Prevention**
   - Deep text sanitization removes all `<script>`, `<iframe>`, `javascript:`, and dangerous DOM event triggers (`onerror=`, `onload=`, `onclick=`).
   - Dynamic HTML rendering sanitizes every user input via `escapeHtml()`.
   - Protects JSON storage from `__proto__`, `constructor`, and `prototype` manipulation.

6. **Server & Cloud Edge Protection**
   - `X-Content-Type-Options: nosniff` (prevents MIME sniffing).
   - `X-Frame-Options: SAMEORIGIN` (blocks unauthorized clickjacking).
   - `Referrer-Policy: strict-origin-when-cross-origin` (prevents confidential referrer leaks).
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=*` (explicitly restricts hardware while authorizing payment processing).
   - `HSTS (Strict-Transport-Security)`: 1-year preload header forces SSL/TLS encryption.
   - Cloud Edge Redirection: Netlify configuration automatically blocks access to `/.env*`, `/.git*`, `/package*.json`, and `/data/*`.

---

## 💳 Step-by-Step Razorpay Payment Gateway Integration

The website comes with **Dual-Mode Razorpay Support**:
- **Test Mode Simulator (Active by default):** Allows candidates and staff to test complete UPI, Debit/Credit Card, and NetBanking checkouts instantly without needing a merchant bank account.
- **Live Razorpay Gateway:** Connects directly to your Razorpay merchant account with real credit cards, UPI, EMI, and NetBanking.

### How to Activate Live Razorpay in 5 Steps:

1. **Step 1: Create a Razorpay Account**
   - Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com) and sign up for a free merchant account.
   - Complete basic KYC for your law firm / company.

2. **Step 2: Generate Your API Key ID**
   - In the Razorpay Dashboard left sidebar, navigate to:
     **Account & Settings** &rarr; **API Keys**.
   - Click **Generate Key** (or **Generate Test Key** for sandboxing).
   - Razorpay will display your **Key ID** (e.g., `rzp_test_...` or `rzp_live_...`) and **Key Secret**.
   - *Note:* The frontend only needs the **Key ID**. The secret is never exposed in client code.

3. **Step 3: Save Key ID in the Admin Portal**
   - Log into your Admin Portal (`https://your-domain/admin.html`).
   - Click **Settings** in the left sidebar.
   - Scroll down to the **Razorpay Payment Gateway Integration** card.
   - Change Gateway Mode to: **Live / Custom Razorpay Gateway**.
   - Paste your **Razorpay Key ID** into the input field.
   - Click **Save Razorpay Configuration**.

4. **Step 4: Configure Webhooks (Optional for Production Server)**
   - In Razorpay Dashboard &rarr; **Settings** &rarr; **Webhooks** &rarr; **Add New Webhook**.
   - Webhook URL: `https://your-backend-api.com/api/orders`
   - Active Events: select `payment.captured` and `order.paid`.

5. **Step 5: Test the Checkout Flow**
   - Open your public website (`/#courses`).
   - Click **Enroll Now** on any course.
   - Complete the form and click **Pay with Razorpay**.
   - Complete the payment and immediately receive the printable **Official Tax Invoice & Admission Pass**.

---

## 📋 Course Buyers & Orders Tracking in Admin Portal

When a student enrolls and completes payment:
1. **Real-time Order Recording:**
   - Saved with Order ID (`ord_...`), Student ID (`LGA-ACAD-XXXX`), Buyer Name, Email, Phone, Organization, Course, Amount (₹), Payment Gateway ID (`pay_...`), and Timestamp.
2. **Dashboard KPI & Recent Activity:**
   - Live **Academy Revenue** counter summing all completed course purchases.
   - Recent Masterclass Purchases table with live badges.
3. **Dedicated "Course Buyers & Orders" Tab:**
   - Full search & filter by Candidate Name, Course, Student ID, or Payment ID.
   - Status filters (*All*, *Paid*, *Refunded*).
   - **View Tax Invoice Modal:** Generates a formal GST Tax Invoice with Firm LLPIN, CGST/SGST tax breakdown, and 1-click **Print Tax Invoice**.
   - **Export CSV:** Secure one-click export of all buyer data for finance and accounting.

---

## 🌐 Real-Time Data Storage on Netlify

### Option 1: Zero-Configuration Netlify Mode (Current Setup)
- Works out-of-the-box when you upload the `deploy/frontend` folder to Netlify.
- Utilizes browser-persisted `localStorage` (`lga_course_orders`, `lga_client_inquiries`, `lga_academy_enrollments`).
- Data submitted through the public website (inquiries and course purchases) appears immediately in your Admin Portal on that domain.

### Option 2: Full-Stack Real-Time Cloud Persistence
To persist data across different devices and browsers simultaneously:
1. Deploy `deploy/backend/` to [Render.com](https://render.com) or [Railway.app](https://railway.app) (Free tier available).
2. Set the backend URL in `deploy/frontend/index.html` and `deploy/frontend/admin.html`:
   ```javascript
   window.LEX_API_URL = 'https://your-backend-api.onrender.com';
   ```
3. Data is written to `db.json` and synchronized in real-time across all global users.
