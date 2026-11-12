# Lex Global Advocacy — Backend API Service

Production REST API service for Lex Global Advocacy LLP, handling authentication, privileged client inquiries, legal academy courses, candidate enrollments, publications, and security backups.

---

## ⚡ Quick Start (Local Run)

1. Navigate to the backend folder:
   ```bash
   cd deploy/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Test health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## 🌐 Deploy to Cloud Providers

### 1. Render.com (Recommended Free / Paid)
1. Push this `backend/` folder to a GitHub repository.
2. In Render Dashboard, click **New +** &rarr; **Web Service**.
3. Select your repository, and set Root Directory to `deploy/backend` (or repo root if backend is in root).
4. Environment: `Node`
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add Environment Variables:
   - `PORT`: `5000` (or leave default assigned by Render)
   - `ADMIN_PASSWORD`: `your_secure_password_here`
   - `CORS_ORIGIN`: `https://your-frontend-domain.vercel.app` (or `*` to allow all)
8. Click **Deploy Web Service**. You will receive an API URL like:
   `https://lex-global-api.onrender.com`

### 2. Railway.app
1. Click **New Project** &rarr; **Deploy from GitHub repo**.
2. Select the repository.
3. Railway automatically detects `package.json` and runs `npm start`.
4. Under Variables, set `ADMIN_PASSWORD` and `PORT`.
5. Generate a public domain under Networking.

### 3. VPS / Ubuntu Linux (Nginx + PM2)
1. Clone to your server: `/var/www/lex-backend`
2. Install dependencies: `npm install --production`
3. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "lex-backend"
   pm2 save
   pm2 startup
   ```
4. Point Nginx reverse proxy to `http://localhost:5000`.

---

## 🔑 Admin Portal Credentials
- **Username:** `admin`
- **Password:** Configured via `ADMIN_PASSWORD` in `.env` (Default: `lexglobal2026`)
