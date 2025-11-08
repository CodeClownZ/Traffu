# 🚦 Traffu

Smart, transparent, AI-assisted traffic fine management.

Traffu streamlines issuing, paying, and analyzing traffic challans. Officers can create digital challans quickly, drivers can view and pay fines online, and administrators get realtime analytics and AI-powered insights — reducing paperwork, cash handling, and corruption risk.

Live demo (AI): https://traffu.up.railway.app  
Frontend + Backend: https://github.com/CodeClownZ/Traffu  
AI Backend: https://github.com/CodeClownZ/AI

---

## ✨ Highlights

- Fast digital challan creation for officers (create in under 10s)
- Driver registration, secure authentication, and fine management
- Online payments routed directly to government accounts
- Realtime dashboards and cross check-post analytics
- AI-powered Q&A and enforcement suggestions via Traffu AI
- Secure auth using JWT and bcrypt; MongoDB persistence

---

## Demo

- AI Chat / Q&A: https://ai-production-b107.up.railway.app/talk  
(Use this for traffic-rule clarifications, driver queries, and enforcement tips)

---

## Screenshot
![Traffu screenshot](https://github.com/user-attachments/assets/fbe07af8-9344-4dfc-aeb0-3527d2d338d8)

---

## 🧩 Tech stack

- Frontend: EJS, HTML, CSS, JavaScript  
- Backend: Node.js, Express  
- Auth: JWT, bcrypt  
- Database: MongoDB (Mongoose)  
- AI: Traffu AI (separate service)  
- Deployment: Railway (or any Node-ready host)

---

## ⚙️ Quick start (local)

1. Clone
   git clone https://github.com/CodeClownZ/Traffu.git
   cd Traffu

2. Install
   npm install

3. Create your .env (example)
   cat > .env <<'EOF'
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/traffu
   JWT_SECRET=SuperSecretKey123!@#
   AI_API_URL=https://ai-production-b107.up.railway.app/talk
   EOF

   Replace values with secure production secrets when deploying.

4. Run (development)
   npm start
   # or with nodemon
   npx nodemon server.js

5. Visit
   http://localhost:3000

---

## Folder overview

Traffu/
├─ locals/        # EJS views, HTML, CSS, static assets  
├─ routes/        # Express route handlers  
├─ models/        # Mongoose schemas  
├─ JS/            # Frontend JavaScript  
└─ server.js      # Application entry point

(Adjust paths if your repo layout differs.)

---

## Deployment tips

- Ensure your MONGO_URI is accessible from your chosen host.
- Add environment variables (PORT, MONGO_URI, JWT_SECRET, AI_API_URL) in Railway / Render / Heroku.
- For production, use a secure secret for JWT and enable HTTPS.
- If hosting Traffu AI separately, set AI_API_URL to your AI instance.

---

## Security & Privacy

- Store JWT_SECRET securely; rotate periodically.
- Use TLS/HTTPS for all endpoints and payment callbacks.
- Ensure payment flows are audited and point to official government accounts only.

---

## Contributing

We welcome contributions!

1. Fork the repo
2. Create a branch: git checkout -b feat/your-feature
3. Make changes and add tests
4. Commit and push
5. Open a Pull Request with a clear description and screenshots

Conventions:
- Keep changes modular and well-documented
- Add tests for new features where possible
- Follow consistent code style and linting rules

---

## Suggested PR template (copy into your PR description)

Title: docs: improve README and usage instructions

Description:
- Polished README content with clearer quickstart, deployment tips, and contributing guide.
- Included environment variable examples and security notes.
- Added demo links and tech stack.

---

## License

GPL-3.0 © CodeClownZ

---

Made with ❤️ by CodeClownZ  
Powered by Traffu AI — your pocket traffic assistant
