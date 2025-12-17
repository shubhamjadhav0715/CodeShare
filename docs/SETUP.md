# 🚀 CodeShare Setup Guide

Complete guide to set up and run CodeShare locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamjadhav0715/CodeShare.git
cd CodeShare
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (Local MongoDB)
MONGODB_URI=mongodb://localhost:27017/codeshare

# OR MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeshare

# JWT Secret (Generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Client URL
CLIENT_URL=http://localhost:3000
```

#### Start MongoDB (if using local)
```bash
# macOS/Linux
mongod

# Windows
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
```

#### Run Backend Server
```bash
npm run dev
```

Server should start on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../client
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

#### Run Frontend
```bash
npm start
```

Frontend should open at `http://localhost:3000`

## ✅ Verify Installation

1. **Backend Health Check:**
   - Visit: `http://localhost:5000/api/health`
   - Should return: `{"success": true, "message": "CodeShare server is running!"}`

2. **Frontend:**
   - Visit: `http://localhost:3000`
   - You should see the CodeShare landing page

3. **Database:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Check database
   use codeshare
   show collections
   ```

## 🎯 Quick Start

1. **Register a new account** at `http://localhost:3000/register`
2. **Login** with your credentials
3. **Create a new project** from the dashboard
4. **Start coding!**

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Check `CLIENT_URL` in backend `.env` matches frontend URL

## 📦 Production Build

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
```

Build files will be in `client/build/`

## 🔐 Security Notes

- **Never commit `.env` files** to Git
- **Change JWT_SECRET** in production
- **Use strong passwords** for MongoDB
- **Enable MongoDB authentication** in production

## 📚 Additional Resources

- [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)

## 🆘 Need Help?

- Open an issue on [GitHub](https://github.com/shubhamjadhav0715/CodeShare/issues)
- Check existing issues for solutions
- Contact: shubhamjadhav0715@gmail.com

---

**Happy Coding! 🚀**
