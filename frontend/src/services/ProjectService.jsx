import axios from "axios";

export const API_URL = "http://localhost:5000/api/projects";

// Fetch all projects
export const getAllProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a project by ID
export const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update general project details
export const updateProject = async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Update project status
export const updateProjectStatus = async ({ id, status }) => {
  const response = await axios.put(`${API_URL}/${id}/status`, { status });
  return response.data;
};

// Update progress and trigger score calculation
export const updateProjectProgress = async ({
  id,
  completedTasks,
  totalTasks,
}) => {
  const response = await axios.put(`${API_URL}/${id}/progress`, {
    completedTasks,
    totalTasks,
  });
  return response.data;
};

// Accept a project
export const acceptProject = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/accept`);
  return response.data;
};

// Create a project
export const createProject = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
