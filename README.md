# TodoManager 🚀

A full-stack Todo Management Application that helps users create, organize, and track daily tasks efficiently.

The application uses **Firebase Authentication** for secure user login and **MongoDB Atlas** for storing user and task data.

---

## 📌 Features

- 🔐 Firebase Authentication Login/Register
- 👤 User profile management
- ✅ Create new tasks
- 📝 Update existing tasks
- 🗑️ Delete tasks
- 📋 View user-specific tasks
- ✔️ Task status management
- ☁️ MongoDB cloud storage
- 🔗 Frontend and Backend API integration
- ⚡ Responsive Next.js interface

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- TypeScript
- CSS
- Firebase SDK

### Backend
- Node.js
- Express.js

### Authentication
- Firebase Authentication

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```
TodoManager/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── Landing-page/
│   │   ├── ProductivityDashboard/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── profile/
│   │   ├── tasks/
│   │   ├── history/
│   │   ├── reviews/
│   │   ├── firebase/
│   │   │   └── config.js
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── .env.local
│   └── package.json
│
├── backend/
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/prathamesh564/TodoManager.git
```

```bash
cd TodoManager
```

---

# Frontend Setup

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install Firebase:

```bash
npm install firebase
```

Run frontend:

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

Install packages:

```bash
npm install
```

Install MongoDB packages:

```bash
npm install mongoose dotenv cors
```

Run backend:

```bash
node server.js
```

Backend:

```
http://localhost:5000
```

---

# 🔐 Environment Variables

## Frontend `.env.local`

Create inside:

```
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Backend `.env`

Create:

```
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string
```

---

# 🔥 Authentication Flow

1. User registers/login using Firebase Authentication
2. Firebase verifies user identity
3. Firebase UID is generated
4. User details are stored in MongoDB
5. Tasks are linked with Firebase UID
6. Users can access only their own tasks

---

# 🗄️ Database Structure

## Users Collection

```json
{
 "_id": "ObjectId",
 "firebaseUid": "firebase_user_id",
 "name": "User Name",
 "email": "user@gmail.com"
}
```

## Tasks Collection

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

# 🚀 Future Improvements

- Google Authentication
- Task reminders
- Priority levels
- Due dates
- Dark mode
- Mobile application
- Deployment with cloud services

---

# 👨‍💻 Authors

## Prathamesh V Shenoy

GitHub:
https://github.com/prathamesh564


## Sohan P Rai

GitHub:
https://github.com/SohanPRai


---

# 📄 License

This project is open-source and available under MIT License.
