# 🚦 Traffu  
### **A Smart Traffic Fine Management System**  
> *Police Issue → Drivers Pay → AI Analyzes → Everyone Wins*

🌐 **Live Demo (AI):** [https://traffu.up.railway.app](https://traffu.up.railway.app)  
💻 **Frontend + Backend:** [CodeClownZ/Traffu](https://github.com/CodeClownZ/Traffu)  
🧠 **AI Backend:** [CodeClownZ/AI](https://github.com/CodeClownZ/AI)  

---

## ✨ Features

- 👮 **Police & Driver registration / login**  
- ⚡ **Create digital challans in under 10 seconds**  
- 🚗 **Drivers view, pay, & track fines easily**  
- 📊 **Real-time analytics across all check-posts**  
- 🤖 **AI-powered insights & traffic-rule Q&A via [Traffu AI](https://ai-production-b107.up.railway.app/talk)**  
- 💰 **Every taka goes directly to government accounts**  
- 🧾 **Zero cash handling → Zero corruption risk**

---
<img width="1382" height="798" alt="image" src="https://github.com/user-attachments/assets/fbe07af8-9344-4dfc-aeb0-3527d2d338d8" />

## 🧩 Tech Stack

| Layer       | Technologies Used |
|--------------|------------------|
| **Frontend** | HTML • CSS • JavaScript • EJS Templates |
| **Backend**  | Node.js • Express |
| **Auth**     | JWT • bcrypt |
| **Database** | MongoDB |
| **AI Engine** | [Traffu AI](https://ai-production-b107.up.railway.app/talk) |
| **Deployment** | Railway |

---

## ⚙️ Quick Start (Local Setup)

```bash
# 1️⃣ Clone the repository
git clone https://github.com/CodeClownZ/Traffu.git
cd Traffu

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create your environment file
cat > .env <<EOF
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/traffu
JWT_SECRET=SuperSecretKey123!@#
AI_API_URL=https://ai-production-b107.up.railway.app/talk
EOF

# 4️⃣ Start the server
npm start
🗂️ Folder Structure
python
Copy code
Traffu/
├── locals/        # EJS pages, HTML, CSS  
├── routes/        # Express route handlers  
├── models/        # MongoDB schemas  
├── JS/            # Frontend JS logic  
└── server.js      # Entry point
☁️ Deploy in 2 Minutes
🍴 Fork this repo

🔗 Connect to Railway / Render

⚙️ Add your .env variables

🚀 Done! Your own Traffu instance is live!

🤝 Contributing
We ❤️ open source!

Fork the repository

Create a new branch

Code & test locally

Submit a Pull Request

💡 We love clean code, good UI, and bold ideas!

📜 License
GPL-3.0 License
© CodeClownZ

Made with ❤️ by CodeClownZ
Powered by Traffu AI – The smartest traffic cop in your pocket!
