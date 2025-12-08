/**
 * Project Routes
 * Handles project CRUD operations
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// Import controllers (will create next)
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember
} = require('../controllers/project.controller');

// All routes are protected
router.use(protect);

// Project CRUD
router.route('/')
  .get(getProjects)      // Get all user projects
  .post(createProject);  // Create new project

router.route('/:id')
  .get(getProject)       // Get single project
  .put(updateProject)    // Update project
  .delete(deleteProject); // Delete project

// Member management
router.post('/:id/members', addMember);
router.delete('/:id/members/:userId', removeMember);

module.exports = router;
