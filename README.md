# 📋 Smart Task Manager

A full-stack task management app with AI-powered task summarization using **Cohere AI**. Users can register, log in, manage tasks, and get intelligent summaries — all in a responsive and interactive UI.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React + Vite**
- **React Router DOM**
- **Axios**

### ⚙️ Backend
- **Node.js**
- **Express.js**
- **MongoDB (Cloud + Compass GUI)**

### 🤖 AI Integration
- **Cohere AI (Free Tier) for task summarization**

### 🧪 Tools Used
- **Postman** for API testing
- **Railway** for backend deployment
- **Vercel** for frontend hosting (planned)

---

## 🧠 AI Summarization Feature

AI feature is available at:

```
POST /api/ai/summarize
```

This route uses Cohere to generate smart summaries from task titles and descriptions:

### Request body:
```json
{
  "tasks": [
    { "title": "Fix login bug", "description": "Resolve token expiration issue" },
    { "title": "Write unit tests", "description": "Cover task controller logic" }
  ]
}
```

### Response:
```json
{
  "summary": "Fix the login token issue and write unit tests for task controller."
}
```

---

## 📂 Folder Structure

```
📦 root
├── 📁 client         # React frontend
│   └── src
│       ├── components
│       ├── pages
│       ├── App.jsx
│       └── main.jsx
├── 📁 server         # Node.js backend
│   ├── routes
│   │   └── aiRoutes.js
│   ├── models
│   ├── controllers
│   ├── server.js
│   └── .env
├── 📁 docs           # Postman collections
└── README.md         # You're reading it
```

---

## 🛠️ Setup Instructions

### Clone the repo:
```bash
git clone https://github.com/Samit-28/Smart_Task_Manager
cd Smart_Task_Manager
```

### 🔧 Backend Setup
```bash
cd server
npm install
npm start
```
#### Note
- I have not included my .env file in GitHub as that file has my MONGODB_URI, CO_API_KEY, SO create one inside server and paste
- PORT, MONGO_URI, JWT_SECRET, CO_API_KEY
- And you can ask me in my [Email](samitsaleem2834@gmail.com)

### 💻 Frontend Setup
```bash
cd client
npm install
npm run dev
```
---
## 📬 Deployment
- Backend: Hosted on [Railway](https://railway.com/)
- Frontend: Hosted on [Vercel](https://vercel.com/)

## 📮 Postman Collection
All API routes can be tested using the Postman collection provided in the `/docs` folder.
- File1: `docs/Smart App Tested.postman_collection.json`
- File2: `docs/Hosted_Smart_App_Tested.postman_collection.json`
- Contains:
  - Auth requests (Signup/Login)
  - CRUD operations for Tasks
- Notes:
  - Token and Task IDs are hardcoded based on test values
  - Base URL: `http://localhost:5000`
  - You can replace these with your own data after importing

## 👨‍💻 Developer
**Samit Saleem**  
[GitHub: Samit-28](https://github.com/Samit-28/Smart_Task_Manager)