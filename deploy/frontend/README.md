# Lex Global Advocacy — Frontend Web Package

A pure HTML5, CSS3, and JavaScript frontend client. No Node.js build step or framework compiler required. Deployable to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, Amazon S3, or Apache/Nginx web hosting).

---

## 📁 Files Included
- `index.html`: Public website with responsive Hero, Firm History, Attorney Profiles, Practice Areas, **Courses & Academy Masterclasses**, **The Legal Hub & Publications**, and Privileged Consultation Intake.
- `admin.html`: Executive Management & Staff Portal for confidential client inquiries, student registrations, course syllabi, article publishing, and database backups.

---

## 🚀 How to Deploy Frontend

### Option 1: Vercel (Easiest)
1. Drag and drop the `deploy/frontend` folder into the [Vercel Dashboard](https://vercel.com).
2. Or connect your Git repository and set the **Root Directory** to `deploy/frontend`.
3. Set Framework Preset to **Other** (Static HTML).
4. Click **Deploy**.

### Option 2: Netlify (Drag & Drop or Git)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `deploy/frontend` folder.
3. Your site goes live instantly with an SSL certificate.

### Option 3: GitHub Pages
1. Push the contents of `deploy/frontend` to the `gh-pages` branch (or `/docs` folder) of your repository.
2. In Repository Settings &rarr; **Pages**, set Source to your branch.

### Option 4: Apache / Nginx / cPanel
1. Upload `index.html` and `admin.html` to your server's `public_html` or `/var/www/html/` directory.

---

## 🔗 Connecting Frontend to Your Backend API

If your backend is hosted separately (e.g. on `https://lex-global-api.onrender.com`), simply open `index.html` and `admin.html` and set:
```html
<script>
window.LEX_API_URL = 'https://lex-global-api.onrender.com';
</script>
```
If you deploy frontend and backend together on the same server, leave `window.LEX_API_URL = '';`.

---

## 🔐 How to Access the Admin Portal
1. Visit: `https://your-frontend-domain.com/admin.html`
2. Enter standard credentials:
   - **Username:** `admin`
   - **Password:** `lexglobal2026` (or the password configured on your backend)
3. You can manage inquiries, review enrolled students, add courses, and download database backups directly from the portal.
