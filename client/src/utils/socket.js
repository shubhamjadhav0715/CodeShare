/**
 * Socket.io Client Utility
 * Manages WebSocket connections for real-time collaboration
 */

import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  // Connect to socket server
  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
    return this.socket;
  }

  // Disconnect from socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Join a project room
  joinProject(projectId, userId, userName) {
    if (this.socket) {
      this.socket.emit('join-project', { projectId, userId, userName });
    }
  }

  // Leave a project room
  leaveProject(projectId, userId, userName) {
    if (this.socket) {
      this.socket.emit('leave-project', { projectId, userId, userName });
    }
  }

  // Send code change
  sendCodeChange(projectId, fileId, content, userId) {
    if (this.socket) {
      this.socket.emit('code-change', { projectId, fileId, content, userId });
    }
  }

  // Listen for code updates
  onCodeUpdate(callback) {
    if (this.socket) {
      this.socket.on('code-update', callback);
    }
  }

  // Send chat message
  sendChatMessage(projectId, message, userId, userName) {
    if (this.socket) {
      this.socket.emit('chat-message', { projectId, message, userId, userName });
    }
  }

  // Listen for chat messages
  onChatMessage(callback) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  // Listen for user joined
  onUserJoined(callback) {
    if (this.socket) {
      this.socket.on('user-joined', callback);
    }
  }

  // Listen for user left
  onUserLeft(callback) {
    if (this.socket) {
      this.socket.on('user-left', callback);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
