/**
 * Socket.io Handler
 * Manages real-time WebSocket connections for collaborative editing
 * Handles code synchronization, chat, and user presence
 */

const connectedUsers = new Map(); // Track connected users per project

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ New client connected: ${socket.id}`);

    /**
     * Join a project room
     */
    socket.on('join-project', ({ projectId, userId, userName }) => {
      socket.join(projectId);
      
      // Track user
      if (!connectedUsers.has(projectId)) {
        connectedUsers.set(projectId, new Map());
      }
      connectedUsers.get(projectId).set(socket.id, { userId, userName });

      // Notify others
      const users = Array.from(connectedUsers.get(projectId).values());
      io.to(projectId).emit('user-joined', {
        userId,
        userName,
        users
      });

      console.log(`👤 ${userName} joined project ${projectId}`);
    });

    /**
     * Leave a project room
     */
    socket.on('leave-project', ({ projectId, userId, userName }) => {
      socket.leave(projectId);
      
      if (connectedUsers.has(projectId)) {
        connectedUsers.get(projectId).delete(socket.id);
        
        const users = Array.from(connectedUsers.get(projectId).values());
        io.to(projectId).emit('user-left', {
          userId,
          userName,
          users
        });
      }

      console.log(`👋 ${userName} left project ${projectId}`);
    });

    /**
     * Code change event
     * Broadcast code changes to all users in the project
     */
    socket.on('code-change', ({ projectId, fileId, content, userId }) => {
      socket.to(projectId).emit('code-update', {
        fileId,
        content,
        userId,
        timestamp: Date.now()
      });
    });

    /**
     * Cursor position event
     * Share cursor position with other users
     */
    socket.on('cursor-move', ({ projectId, fileId, position, userId, userName }) => {
      socket.to(projectId).emit('cursor-update', {
        fileId,
        position,
        userId,
        userName
      });
    });

    /**
     * Chat message event
     */
    socket.on('chat-message', ({ projectId, message, userId, userName }) => {
      io.to(projectId).emit('new-message', {
        message,
        userId,
        userName,
        timestamp: Date.now()
      });
    });

    /**
     * Typing indicator
     */
    socket.on('typing-start', ({ projectId, userId, userName }) => {
      socket.to(projectId).emit('user-typing', { userId, userName });
    });

    socket.on('typing-stop', ({ projectId, userId }) => {
      socket.to(projectId).emit('user-stopped-typing', { userId });
    });

    /**
     * File operations
     */
    socket.on('file-created', ({ projectId, file }) => {
      socket.to(projectId).emit('file-added', { file });
    });

    socket.on('file-deleted', ({ projectId, fileId }) => {
      socket.to(projectId).emit('file-removed', { fileId });
    });

    socket.on('file-renamed', ({ projectId, fileId, newName }) => {
      socket.to(projectId).emit('file-name-changed', { fileId, newName });
    });

    /**
     * Disconnect event
     */
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      
      // Remove user from all projects
      connectedUsers.forEach((projectUsers, projectId) => {
        if (projectUsers.has(socket.id)) {
          const user = projectUsers.get(socket.id);
          projectUsers.delete(socket.id);
          
          const users = Array.from(projectUsers.values());
          io.to(projectId).emit('user-left', {
            userId: user.userId,
            userName: user.userName,
            users
          });
        }
      });
    });

    /**
     * Error handling
     */
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  console.log('🔌 Socket.io initialized');
};
