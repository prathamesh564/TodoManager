# TodoManager 🚀

A full-stack Todo Management Application that helps users create, organize, and track daily tasks efficiently.

The application uses **Firebase Authentication** for secure user login and **MongoDB** for storing users and task data.

---

## 📌 Features

- 🔐 User authentication using Firebase
- ✅ Create new tasks
- 📝 Update existing tasks
- 🗑️ Delete tasks
- 📋 View all tasks
- ✔️ Task status management
- 👤 User profile management
- ☁️ Cloud database storage
- ⚡ Responsive interface

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- TypeScript
- CSS

### Backend
- Node.js
- Express.js

### Authentication
- Firebase Authentication

### Database
- MongoDB
- MongoDB Atlas

---

## 📂 Project Structure

```
TodoManager/
│
├── frontend/
│   │
│   └── app/
│       ├── Landing-page/
│       ├── ProductivityDashboard/
│       ├── dashboard/
│       ├── login/
│       ├── profile/
│       ├── tasks/
│       ├── history/
│       ├── reviews/
│       ├── globals.css
│       └── layout.tsx
│
├── backend/
│   │
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── .env
│   └── .gitignore
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/prathamesh564/TodoManager.git
```

```bash
cd TodoManager
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# Backend Setup

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start server:

```bash
node server.js
```

Backend:

```
http://localhost:5000
```

---

## 🔐 Environment Variables

Create `.env` file inside backend:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

---

## 🗄️ Database Design

### Users Collection

```json
{
  "_id": "ObjectId",
  "firebaseUid": "user_id",
  "name": "User Name",
  "email": "user@gmail.com"
}
```

### Tasks Collection

```json
{
  "_id": "ObjectId",
  "userId": "firebaseUid",
  "title": "Complete Project",
  "description": "Finish TodoManager",
  "status": "pending",
  "createdAt": "date"
}
```

---

## 🔥 Authentication Flow

1. User registers/logs in using Firebase
2. Firebase verifies user identity
3. User UID is stored in MongoDB
4. Tasks are linked with authenticated user
5. User can manage personal tasks

---

## 🚀 Future Improvements

- Google login
- Task reminders
- Priority levels
- Due dates
- Dark mode
- Cloud deployment
- Mobile application

---

## 👨‍💻 Authors

### Prathamesh V Shenoy
GitHub:  
https://github.com/prathamesh564


### Sohan P Rai
GitHub:  
https://github.com/SohanPRai


---

## 📄 License

This project is open-source and available under the MIT License.
