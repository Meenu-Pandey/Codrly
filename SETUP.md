# Codrly Setup Guide

Your backend has been fixed and connected to the frontend! Here's how to run both servers:

## 🚀 Quick Start

### 1. Backend Server (Port 3000)
```bash
cd Backend
npm install
npm start
```

### 2. Frontend Server (Port 5173)
```bash
npm run dev
```

## 📁 What Was Fixed

### Backend Issues Resolved:
- ✅ Added missing dependencies (`cors`, `dotenv`, `@google/generative-ai`)
- ✅ Created missing AI routes (`/ai/fix-code`, `/ai/review-code`)
- ✅ Created AI controller for request handling
- ✅ Created AI service for Google Gemini integration
- ✅ Fixed CORS configuration for frontend communication
- ✅ Added proper npm scripts

### Frontend Updates:
- ✅ Removed direct Google AI API calls
- ✅ Created API service for backend communication
- ✅ Updated App.jsx to use backend endpoints
- ✅ Maintained all existing functionality

## 🔧 Architecture

```
Frontend (React + Vite)     Backend (Express + Node.js)
Port 5173  ──────────────►  Port 3000
     │                           │
     │                           ▼
     │                    AI Routes (/ai/*)
     │                           │
     │                           ▼
     │                    AI Controller
     │                           │
     │                           ▼
     │                    AI Service
     │                           │
     │                           ▼
     │                    Google Gemini API
```

## 🌐 API Endpoints

### Fix Code
- **POST** `http://localhost:3000/ai/fix-code`
- **Body**: `{ "code": "your code", "language": "javascript" }`
- **Response**: `{ "success": true, "fixedCode": "fixed code" }`

### Review Code
- **POST** `http://localhost:3000/ai/review-code`
- **Body**: `{ "code": "your code", "language": "javascript" }`
- **Response**: `{ "success": true, "review": "detailed review" }`

## 🎯 Features Working

- ✅ Code Editor with syntax highlighting
- ✅ Language selection (21 programming languages)
- ✅ Code fixing via AI
- ✅ Code reviewing via AI
- ✅ Code templates
- ✅ Save/Load functionality
- ✅ Dark/Light theme toggle
- ✅ Keyboard shortcuts
- ✅ Responsive design

## 🔑 Environment Variables

Create a `.env` file in the `Backend` directory:
```
PORT=3000
GOOGLE_AI_API_KEY=your_api_key_here
NODE_ENV=development
```

## 🚀 Both servers are now running:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

Your Codrly application is ready to use! 🎉
