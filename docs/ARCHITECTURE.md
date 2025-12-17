# 🏗️ CodeShare Architecture

Comprehensive overview of CodeShare's system architecture and design decisions.

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │ Redux Store  │  │  Socket.io   │      │
│  │  Components  │  │    (State)   │  │   Client     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                        Server Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Express.js  │  │  Socket.io   │  │     JWT      │      │
│  │   REST API   │  │    Server    │  │     Auth     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│                        MongoDB                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Users     │  │   Projects   │  │    Files     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Frontend Architecture

### Technology Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **TailwindCSS** - Styling
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **Monaco Editor** - Code editor

### Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   │   ├── ProjectCard
│   │   └── CreateProjectModal
│   └── Editor
│       ├── FileTree
│       ├── CodeEditor (Monaco)
│       ├── ChatPanel
│       └── UserList
└── Loading
```

### State Management (Redux)

```javascript
store
├── auth
│   ├── user
│   ├── token
│   ├── isAuthenticated
│   └── loading
├── project
│   ├── projects[]
│   ├── currentProject
│   └── loading
└── editor
    ├── files[]
    ├── currentFile
    ├── activeUsers[]
    ├── chatMessages[]
    └── settings
```

### Data Flow

```
User Action → Component → Redux Action → API Call
                                ↓
                          Update State
                                ↓
                          Re-render UI
```

## 🔧 Backend Architecture

### Technology Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.io** - WebSocket server
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Folder Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── auth.controller.js   # Auth logic
│   ├── project.controller.js
│   └── file.controller.js
├── models/
│   ├── User.model.js        # User schema
│   ├── Project.model.js
│   └── File.model.js
├── routes/
│   ├── auth.routes.js       # Auth endpoints
│   ├── project.routes.js
│   └── file.routes.js
├── middleware/
│   └── auth.middleware.js   # JWT verification
├── socket/
│   └── socketHandler.js     # WebSocket logic
└── server.js                # Entry point
```

### Request Flow

```
Client Request
    ↓
Express Router
    ↓
Middleware (Auth)
    ↓
Controller
    ↓
Model (Mongoose)
    ↓
MongoDB
    ↓
Response
```

## 💾 Database Design

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  avatar: String,
  bio: String,
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Projects Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  owner: ObjectId (ref: User, indexed),
  members: [{
    user: ObjectId (ref: User),
    role: String (enum: ['owner', 'editor', 'viewer']),
    joinedAt: Date
  }],
  language: String,
  isPublic: Boolean,
  settings: {
    theme: String,
    fontSize: Number,
    tabSize: Number
  },
  lastAccessed: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Files Collection
```javascript
{
  _id: ObjectId,
  name: String,
  path: String,
  content: String,
  language: String,
  project: ObjectId (ref: Project, indexed),
  createdBy: ObjectId (ref: User),
  lastModifiedBy: ObjectId (ref: User),
  size: Number,
  isFolder: Boolean,
  parentFolder: ObjectId (ref: File),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

```javascript
// Users
{ email: 1 } // Unique index

// Projects
{ owner: 1, createdAt: -1 }
{ 'members.user': 1 }

// Files
{ project: 1, path: 1 }
{ project: 1, isFolder: 1 }
```

## 🔌 Real-Time Communication

### WebSocket Architecture

```
Client                    Server
  │                         │
  ├─ connect ──────────────>│
  │<──────────── connected ─┤
  │                         │
  ├─ join-project ─────────>│
  │<────────── user-joined ─┤
  │                         │
  ├─ code-change ──────────>│
  │                         ├─> Broadcast to room
  │<────────── code-update ─┤
  │                         │
  ├─ chat-message ─────────>│
  │                         ├─> Broadcast to room
  │<────────── new-message ─┤
  │                         │
  ├─ disconnect ───────────>│
  │<──────────── user-left ─┤
```

### Socket Events

**Client → Server:**
- `join-project` - Join collaboration room
- `leave-project` - Leave room
- `code-change` - Send code updates
- `chat-message` - Send messages

**Server → Client:**
- `user-joined` - User joined notification
- `user-left` - User left notification
- `code-update` - Code changed by others
- `new-message` - New chat message

## 🔐 Security Architecture

### Authentication Flow

```
1. User Login
   ↓
2. Verify Credentials
   ↓
3. Generate JWT Token
   ↓
4. Send Token to Client
   ↓
5. Client Stores Token
   ↓
6. Include Token in Requests
   ↓
7. Server Verifies Token
   ↓
8. Grant/Deny Access
```

### Security Measures

- **Password Hashing:** bcrypt with salt rounds
- **JWT Tokens:** Signed with secret key
- **CORS:** Configured for specific origins
- **Input Validation:** express-validator
- **Rate Limiting:** (To be implemented)
- **HTTPS:** Required in production

## 📈 Scalability Considerations

### Current Architecture
- Single server instance
- Direct MongoDB connection
- In-memory socket connections

### Future Improvements

1. **Horizontal Scaling**
   - Load balancer (Nginx)
   - Multiple server instances
   - Redis for session storage

2. **Database Optimization**
   - Read replicas
   - Sharding for large datasets
   - Caching layer (Redis)

3. **WebSocket Scaling**
   - Redis adapter for Socket.io
   - Sticky sessions
   - Message queue (RabbitMQ)

4. **CDN Integration**
   - Static asset delivery
   - Global distribution

## 🚀 Deployment Architecture

### Development
```
localhost:3000 (React) → localhost:5000 (Express) → localhost:27017 (MongoDB)
```

### Production
```
Vercel (Frontend) → Railway/Render (Backend) → MongoDB Atlas (Database)
```

## 📊 Performance Optimization

### Frontend
- Code splitting
- Lazy loading
- Memoization (React.memo, useMemo)
- Virtual scrolling for large lists

### Backend
- Database indexing
- Query optimization
- Response caching
- Compression middleware

### Network
- HTTP/2
- Gzip compression
- Asset minification
- Image optimization

## 🔄 Data Synchronization

### Conflict Resolution
```
1. User A edits line 10
2. User B edits line 10 simultaneously
3. Server receives both changes
4. Last write wins (timestamp-based)
5. Broadcast update to all users
```

### Future: Operational Transformation
- CRDT (Conflict-free Replicated Data Types)
- OT algorithms for better conflict resolution

## 📝 Design Patterns Used

- **MVC Pattern** - Model-View-Controller separation
- **Repository Pattern** - Data access abstraction
- **Singleton Pattern** - Socket service instance
- **Observer Pattern** - Redux state updates
- **Factory Pattern** - Model creation

## 🎯 Design Decisions

### Why MERN Stack?
- **JavaScript everywhere** - Single language
- **Rich ecosystem** - npm packages
- **Real-time capable** - Socket.io integration
- **Scalable** - Horizontal scaling possible

### Why MongoDB?
- **Flexible schema** - Easy to iterate
- **JSON-like documents** - Natural fit for JS
- **Scalability** - Sharding support
- **Performance** - Fast reads/writes

### Why Redux Toolkit?
- **Simplified Redux** - Less boilerplate
- **Built-in best practices** - Immer, thunks
- **DevTools** - Time-travel debugging
- **TypeScript support** - Type safety

---

**This architecture is designed to be maintainable, scalable, and developer-friendly! 🚀**
