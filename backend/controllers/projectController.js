const Project = require("../models/Project");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept project
exports.acceptProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { haveAccepted: true },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update project status
exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update progress and automatically calculate score
exports.updateProjectProgress = async (req, res) => {
  try {
    const { completedTasks, totalTasks } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.completedTasks = completedTasks;
    project.totalTasks = totalTasks;

    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// General update project (optional, if needed)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
