# 🚀 CodeShare - Real-Time Collaborative Code Editor

![CodeShare Banner](https://via.placeholder.com/1200x300/667eea/ffffff?text=CodeShare+-+Code+Together+in+Real-Time)

**CodeShare** is a modern, real-time collaborative code editor built with the MERN stack. It enables developers to code together seamlessly, just like Google Docs but for programming.

## ✨ Features

### 🔐 Authentication & User Management
- Secure user registration and login
- JWT-based authentication
- User profiles with avatars
- Session management

### 💻 Real-Time Code Editor
- Live collaborative editing
- Multiple users can edit simultaneously
- Syntax highlighting for popular languages
- Auto-save functionality
- File management (create, edit, delete)

### 📁 Project Management
- Create and manage multiple projects
- Invite team members to projects
- Project dashboard
- File tree navigation

### 💬 Real-Time Chat
- Instant messaging within projects
- See who's online
- Message history
- Typing indicators

### 🎨 Modern UI/UX
- Clean and intuitive interface
- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Smooth animations

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **Socket.io Client** - Real-time communication
- **Monaco Editor** - Code editor (VS Code's editor)
- **TailwindCSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.io** - WebSocket server
- **JWT** - Authentication
- **bcrypt** - Password hashing

### DevOps
- **Git** - Version control
- **Docker** - Containerization (coming soon)
- **Vercel** - Frontend deployment
- **Railway/Render** - Backend deployment

## 📂 Project Structure

```
CodeShare/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store & slices
│   │   ├── services/      # API calls
│   │   ├── utils/         # Helper functions
│   │   └── App.jsx
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── socket/           # Socket.io handlers
│   ├── utils/            # Helper functions
│   └── server.js
│
├── docs/                 # Documentation
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhamjadhav0715/CodeShare.git
   cd CodeShare
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in `server/` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

   Create `.env` file in `client/` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

5. **Run the Application**

   **Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Project Endpoints
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### File Endpoints
- `GET /api/files/:projectId` - Get project files
- `POST /api/files` - Create new file
- `PUT /api/files/:id` - Update file content
- `DELETE /api/files/:id` - Delete file

## 🎯 Roadmap

### Phase 1 - Foundation ✅ (Current)
- [x] Project setup
- [x] Basic structure
- [ ] Authentication system
- [ ] Database models

### Phase 2 - Core Features (Week 2-3)
- [ ] Code editor integration
- [ ] Real-time collaboration
- [ ] File management
- [ ] Project CRUD operations

### Phase 3 - Advanced Features (Week 4-5)
- [ ] Chat system
- [ ] User presence
- [ ] Code syntax highlighting
- [ ] Auto-save

### Phase 4 - Polish & Deploy (Week 6)
- [ ] UI/UX improvements
- [ ] Testing
- [ ] Performance optimization
- [ ] Deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shubham Jadhav**
- GitHub: [@shubhamjadhav0715](https://github.com/shubhamjadhav0715)
- Email: shubhamjadhav0715@gmail.com

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- Socket.io for real-time communication
- MERN stack community

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/shubhamjadhav0715/CodeShare?style=social)
![GitHub forks](https://img.shields.io/github/forks/shubhamjadhav0715/CodeShare?style=social)
![GitHub issues](https://img.shields.io/github/issues/shubhamjadhav0715/CodeShare)
![GitHub license](https://img.shields.io/github/license/shubhamjadhav0715/CodeShare)

---

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Shubham Jadhav
