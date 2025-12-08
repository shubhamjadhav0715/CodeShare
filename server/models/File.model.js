/**
 * File Model
 * Defines the schema for code files within projects
 * Stores file content, metadata, and version history
 */

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a file name'],
    trim: true
  },
  path: {
    type: String,
    required: true,
    default: '/'
  },
  content: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'cpp', 'html', 'css', 'json', 'markdown', 'text'],
    default: 'text'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  size: {
    type: Number,
    default: 0 // Size in bytes
  },
  isFolder: {
    type: Boolean,
    default: false
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null
  }
}, {
  timestamps: true
});

// Calculate file size before saving
fileSchema.pre('save', function(next) {
  if (this.content) {
    this.size = Buffer.byteLength(this.content, 'utf8');
  }
  next();
});

// Index for faster queries
fileSchema.index({ project: 1, path: 1 });
fileSchema.index({ project: 1, isFolder: 1 });

module.exports = mongoose.model('File', fileSchema);
