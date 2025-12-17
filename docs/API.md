# 📡 CodeShare API Documentation

Complete API reference for CodeShare backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://via.placeholder.com/150",
    "role": "user",
    "createdAt": "2025-12-17T10:00:00.000Z"
  }
}
```

### Login User

**POST** `/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://via.placeholder.com/150",
    "role": "user",
    "createdAt": "2025-12-17T10:00:00.000Z"
  }
}
```

### Get Current User

**GET** `/auth/me` 🔒

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://via.placeholder.com/150",
    "bio": "Full-stack developer",
    "role": "user",
    "createdAt": "2025-12-17T10:00:00.000Z"
  }
}
```

### Update Profile

**PUT** `/auth/profile` 🔒

Update user profile information.

**Request Body:**
```json
{
  "name": "John Updated",
  "bio": "Senior Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## 📁 Project Endpoints

### Get All Projects

**GET** `/projects` 🔒

Get all projects for authenticated user.

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "My Project",
      "description": "A cool project",
      "language": "javascript",
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "members": [...],
      "isPublic": false,
      "createdAt": "2025-12-17T10:00:00.000Z",
      "updatedAt": "2025-12-17T10:00:00.000Z"
    }
  ]
}
```

### Get Single Project

**GET** `/projects/:id` 🔒

Get project details by ID.

**Response (200):**
```json
{
  "success": true,
  "project": { ... }
}
```

### Create Project

**POST** `/projects` 🔒

Create a new project.

**Request Body:**
```json
{
  "name": "My New Project",
  "description": "Project description",
  "language": "javascript",
  "isPublic": false
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "project": { ... }
}
```

### Update Project

**PUT** `/projects/:id` 🔒

Update project details (owner only).

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "settings": {
    "theme": "dark",
    "fontSize": 16
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "project": { ... }
}
```

### Delete Project

**DELETE** `/projects/:id` 🔒

Delete a project (owner only).

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Add Member

**POST** `/projects/:id/members` 🔒

Add a member to project (owner only).

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439013",
  "role": "editor"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Member added successfully",
  "project": { ... }
}
```

### Remove Member

**DELETE** `/projects/:id/members/:userId` 🔒

Remove a member from project (owner only).

**Response (200):**
```json
{
  "success": true,
  "message": "Member removed successfully",
  "project": { ... }
}
```

---

## 📄 File Endpoints

### Get Project Files

**GET** `/files/project/:projectId` 🔒

Get all files in a project.

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "files": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "name": "index.js",
      "path": "/",
      "content": "console.log('Hello');",
      "language": "javascript",
      "size": 22,
      "isFolder": false,
      "createdBy": { ... },
      "createdAt": "2025-12-17T10:00:00.000Z"
    }
  ]
}
```

### Get Single File

**GET** `/files/:id` 🔒

Get file details and content.

**Response (200):**
```json
{
  "success": true,
  "file": { ... }
}
```

### Create File

**POST** `/files` 🔒

Create a new file in project.

**Request Body:**
```json
{
  "name": "app.js",
  "path": "/src",
  "content": "// Code here",
  "language": "javascript",
  "project": "507f1f77bcf86cd799439011",
  "isFolder": false
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "File created successfully",
  "file": { ... }
}
```

### Update File

**PUT** `/files/:id` 🔒

Update file content or metadata.

**Request Body:**
```json
{
  "content": "// Updated code",
  "name": "app.js"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "File updated successfully",
  "file": { ... }
}
```

### Delete File

**DELETE** `/files/:id` 🔒

Delete a file.

**Response (200):**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details..."
}
```

---

## 🔌 WebSocket Events

### Client → Server

- `join-project` - Join a project room
- `leave-project` - Leave a project room
- `code-change` - Send code changes
- `cursor-move` - Send cursor position
- `chat-message` - Send chat message
- `typing-start` - Start typing indicator
- `typing-stop` - Stop typing indicator

### Server → Client

- `user-joined` - User joined project
- `user-left` - User left project
- `code-update` - Code changed by another user
- `cursor-update` - Cursor moved by another user
- `new-message` - New chat message
- `user-typing` - User is typing
- `user-stopped-typing` - User stopped typing

---

## 📝 Notes

- 🔒 = Requires authentication
- All timestamps are in ISO 8601 format
- File sizes are in bytes
- Passwords must be at least 6 characters

---

**For more details, check the source code!**
