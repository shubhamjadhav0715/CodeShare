/**
 * File Routes
 * Handles file CRUD operations within projects
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// Import controllers (will create next)
const {
  getFiles,
  getFile,
  createFile,
  updateFile,
  deleteFile
} = require('../controllers/file.controller');

// All routes are protected
router.use(protect);

// File CRUD
router.route('/')
  .post(createFile);  // Create new file

router.route('/project/:projectId')
  .get(getFiles);     // Get all files in a project

router.route('/:id')
  .get(getFile)       // Get single file
  .put(updateFile)    // Update file content
  .delete(deleteFile); // Delete file

module.exports = router;
