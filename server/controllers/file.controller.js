/**
 * File Controller
 * Handles file CRUD operations within projects
 */

const File = require('../models/File.model');
const Project = require('../models/Project.model');

/**
 * @desc    Get all files in a project
 * @route   GET /api/files/project/:projectId
 * @access  Private
 */
exports.getFiles = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const hasAccess = project.owner.toString() === req.user._id.toString() ||
                     project.members.some(m => m.user.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this project'
      });
    }

    const files = await File.find({ project: projectId })
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .sort({ path: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: files.length,
      files
    });

  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching files',
      error: error.message
    });
  }
};

/**
 * @desc    Get single file
 * @route   GET /api/files/:id
 * @access  Private
 */
exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email');

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Check project access
    const project = await Project.findById(file.project);
    const hasAccess = project.owner.toString() === req.user._id.toString() ||
                     project.members.some(m => m.user.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this file'
      });
    }

    res.status(200).json({
      success: true,
      file
    });

  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching file',
      error: error.message
    });
  }
};

/**
 * @desc    Create new file
 * @route   POST /api/files
 * @access  Private
 */
exports.createFile = async (req, res) => {
  try {
    const { name, path, content, language, project, isFolder, parentFolder } = req.body;

    // Check project access
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const hasAccess = projectDoc.owner.toString() === req.user._id.toString() ||
                     projectDoc.members.some(m => m.user.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create files in this project'
      });
    }

    const file = await File.create({
      name,
      path: path || '/',
      content: content || '',
      language: language || 'text',
      project,
      isFolder: isFolder || false,
      parentFolder: parentFolder || null,
      createdBy: req.user._id,
      lastModifiedBy: req.user._id
    });

    await file.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'File created successfully',
      file
    });

  } catch (error) {
    console.error('Create file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating file',
      error: error.message
    });
  }
};

/**
 * @desc    Update file
 * @route   PUT /api/files/:id
 * @access  Private
 */
exports.updateFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Check project access
    const project = await Project.findById(file.project);
    const hasAccess = project.owner.toString() === req.user._id.toString() ||
                     project.members.some(m => m.user.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this file'
      });
    }

    const { name, content, language } = req.body;

    if (name) file.name = name;
    if (content !== undefined) file.content = content;
    if (language) file.language = language;
    
    file.lastModifiedBy = req.user._id;

    await file.save();
    await file.populate('lastModifiedBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'File updated successfully',
      file
    });

  } catch (error) {
    console.error('Update file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating file',
      error: error.message
    });
  }
};

/**
 * @desc    Delete file
 * @route   DELETE /api/files/:id
 * @access  Private
 */
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Check project access
    const project = await Project.findById(file.project);
    const hasAccess = project.owner.toString() === req.user._id.toString() ||
                     project.members.some(m => m.user.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this file'
      });
    }

    await file.deleteOne();

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
};
