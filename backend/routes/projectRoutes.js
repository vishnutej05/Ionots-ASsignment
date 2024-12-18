const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProject,
  getProjectById,
  acceptProject,
  updateProjectStatus,
  updateProjectProgress,
} = require("../controllers/projectController");

const router = express.Router();

// Core Project Routes
router.get("/", getAllProjects); //to Get all projects
router.get("/:id", getProjectById); //to Get project by ID
router.post("/", createProject); //to Create a project
router.post("/:id/accept", acceptProject); // Accept a project

// Update Routes
router.put("/:id", updateProject); //to Update general project details
router.put("/:id/status", updateProjectStatus); //to Update project status
router.put("/:id/progress", updateProjectProgress); //to Update project progress and score

module.exports = router;
