# 🏥 BimaPlan - Claims Management System

A comprehensive full-stack web application for managing insurance claims and policies built with **React.js** and **Node.js**.

![BimaPlan Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## 🚀 Live Demo

- **Frontend**: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- **Backend API**: [https://your-backend-url.vercel.app](https://your-backend-url.vercel.app)

## ✨ Features

### 🎯 **Core Features**
- **Claims Management**: Create, view, and update insurance claims
- **Policy Management**: Browse available insurance policies
- **Status Tracking**: Real-time claim status updates (Pending → Approved → Rejected)
- **Document Verification**: Track document submission status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎨 **UI/UX Features**
- **Modern Glassmorphism Design**: Beautiful transparent card layouts
- **Gradient Backgrounds**: Eye-catching purple-blue gradients
- **Interactive Animations**: Smooth hover effects and transitions
- **Form Validation**: Real-time regex-based input validation
- **Loading States**: Professional loading and error handling

### 🔧 **Technical Features**
- **RESTful API**: Complete CRUD operations for claims and policies
- **MongoDB Integration**: Robust data storage with Mongoose ODM
- **Environment-based Configuration**: Separate dev/prod settings
- **Proxy Setup**: Seamless development experience with Vite proxy
- **Error Handling**: Comprehensive error catching and user feedback

## 🏗️ Tech Stack

### **Frontend**
- **Framework**: React 19.2.0 with Vite
- **Routing**: React Router DOM 6.30.1
- **HTTP Client**: Axios 1.6.2
- **Styling**: Custom CSS with modern design patterns
- **Build Tool**: Vite 7.2.2

### **Backend**
- **Runtime**: Node.js with Express 5.1.0
- **Database**: MongoDB with Mongoose 8.19.3
- **Environment**: dotenv for configuration
- **CORS**: Cross-origin resource sharing enabled

### **DevOps & Deployment**
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Vercel Serverless Functions
- **Version Control**: Git & GitHub
- **Environment Management**: Environment variables for dev/prod

## 📁 Project Structure

```
BimaPlan_Assignment/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── server.js          # Express server setup
│   │   ├── routes.js          # API route definitions
│   │   └── model.js           # MongoDB schemas & dummy data
│   ├── .env                   # Environment variables
│   ├── package.json           # Dependencies & scripts
│   └── vercel.json            # Vercel deployment config
│
├── client/                     # React Frontend
│   └── my-app/
│       ├── src/
│       │   ├── components/    # Reusable components
│       │   ├── pages/         # Page components
│       │   │   ├── Home.jsx
│       │   │   ├── Claims.jsx
│       │   │   ├── policies.jsx
│       │   │   └── CreateClaim.jsx
│       │   ├── styles/        # CSS styling files
│       │   │   ├── Home.css
│       │   │   ├── Claims.css
│       │   │   ├── policies.css
│       │   │   └── CreateClaim.css
│       │   ├── config/        # API configuration
│       │   │   └── api.js
│       │   ├── App.jsx        # Main app component
│       │   └── main.jsx       # React entry point
│       ├── package.json       # Frontend dependencies
│       ├── vite.config.js     # Vite configuration
│       └── vercel.json        # Vercel deployment config
│
└── README.md                  # Project documentation
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/Raj4478/BimaPlan_Assignment.git
cd BimaPlan_Assignment
```

### **2. Backend Setup**
```bash
cd backend
npm install

# Create .env file
MONGO_DB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/bimaplan
PORT=8000
NODE_ENV=development

# Start backend server
npm start
```

### **3. Frontend Setup**
```bash
cd client/my-app
npm install

# Start development server
npm run dev
```

### **4. Open Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## 🛠️ Development

### **Available Scripts**

**Backend:**
```bash
npm start          # Start production server
npm run dev        # Start development server
```

**Frontend:**
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### **Environment Variables**

**Backend (.env):**
```env
MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/bimaplan
PORT=8000
NODE_ENV=production
```

**Frontend (.env.production):**
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
```

## 📡 API Endpoints

### **Claims**
- `GET /api/claims` - Get all claims
- `POST /api/claims` - Create new claim
- `PATCH /api/claims/:id/status` - Update claim status

### **Policies**
- `GET /api/policies` - Get all policies

### **Example API Response**
```json
{
  "id": "CLM-001",
  "policyId": "POL-001",
  "claimAmount": 15000,
  "claimReason": "Medical emergency treatment...",
  "claimDate": "2024-11-01T10:30:00.000Z",
  "status": "Approved",
  "documentsSubmitted": true
}
```

