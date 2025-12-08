/**
 * Project Model
 * Defines the schema for collaborative coding projects
 * Each project can have multiple files and team members
 */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
    trim: true,
    minlength: [2, 'Project name must be at least 2 characters'],
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'editor', 'viewer'],
      default: 'editor'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'cpp', 'html', 'css', 'other'],
    default: 'javascript'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  settings: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    fontSize: {
      type: Number,
      default: 14,
      min: 10,
      max: 24
    },
    tabSize: {
      type: Number,
      default: 2,
      min: 2,
      max: 8
    }
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ owner: 1, createdAt: -1 });
projectSchema.index({ 'members.user': 1 });

// Update lastAccessed on any modification
projectSchema.pre('save', function(next) {
  this.lastAccessed = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
