import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  updateProjectStatus,
  updateProjectProgress,
} from "../services/ProjectService";
import { acceptProject } from "../services/ProjectService";

function ProjectDetails({ project }) {
  const [status, setStatus] = useState(project?.status || "pending");
  const [haveAccepted, sethaveAccepted] = useState(project?.haveAccepted);
  const [completedTasks, setCompletedTasks] = useState(
    project?.completedTasks || 0
  );
  const [totalTasks, setTotalTasks] = useState(project?.totalTasks || 0);

  const queryClient = useQueryClient();

  // console.log(haveAccepted);

  // Mutation to update project status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateProjectStatus({ id, status }), // Service call
    onSuccess: () => {
      toast.success("Project status updated successfully!");
      queryClient.invalidateQueries(["project", project._id]);
    },
    onError: () => {
      toast.error("Failed to update project status.");
    },
  });

  // Mutation to update project progress
  const updateProgressMutation = useMutation({
    mutationFn: ({ id, completedTasks, totalTasks }) =>
      updateProjectProgress({ id, completedTasks, totalTasks }), // Service call
    onSuccess: () => {
      toast.success("Progress updated successfully!");
      queryClient.invalidateQueries(["project", project._id]);
    },
    onError: () => {
      toast.error("Failed to update progress.");
    },
  });

  const acceptProjectMutation = useMutation({
    mutationFn: (id) => acceptProject(id), 
    onSuccess: () => {
      toast.success("Project accepted successfully!");
      queryClient.invalidateQueries(["project", project._id]); // Refresh the project query
    },
    onError: () => {
      toast.error("Failed to accept project.");
    },
  });

  const handleAcceptProject = () => {
    acceptProjectMutation.mutate(project._id); 
    sethaveAccepted(true);
  };

  const handleProgressUpdate = () => {
    if (totalTasks < 1) {
      toast.error("Total tasks must be at least 1.");
      return;
    }
    if (completedTasks < 0 || completedTasks > totalTasks) {
      toast.error("Completed tasks must be between 0 and total tasks.");
      return;
    }
    updateProgressMutation.mutate({
      id: project._id,
      completedTasks,
      totalTasks,
    });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">
        {project?.title || "Loading..."}
      </h2>
      <p className="text-gray-700 mt-2">
        {project?.description || "Description not available."}
      </p>

      {/* Accept Project */}
      {!haveAccepted && (
        <button
          onClick={handleAcceptProject}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Accept Project
        </button>
      )}

      {}

      {/* Update Status */}
      {haveAccepted && (
        <div className="mt-6">
          <label className="block text-gray-600 font-medium">
            Project Status
          </label>
          <select
            className="mt-2 p-2 border rounded w-full"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              updateStatusMutation.mutate({
                id: project._id,
                status: e.target.value,
              });
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      {/* Update Progress */}
      {haveAccepted && (
        <div className="mt-6">
          <label
            className="block text-gray-600 font-medium"
            htmlFor="CompletedTasks"
          >
            Tasks Completed
          </label>
          <div className="flex items-center space-x-4">
            <input
              id="CompletedTasks"
              type="number"
              min="0"
              placeholder="Completed Tasks"
              value={completedTasks}
              onChange={(e) => setCompletedTasks(Number(e.target.value))}
              className="p-2 border rounded"
            />
            <label
              className="block text-gray-600 font-medium"
              htmlFor="TotalTasks"
            >
              Total Tasks
            </label>
            <input
              id="TotalTasks"
              type="number"
              min="1"
              placeholder="Total Tasks"
              value={totalTasks}
              onChange={(e) => setTotalTasks(Number(e.target.value))}
              className="p-2 border rounded"
            />
            <button
              onClick={handleProgressUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update Progress
            </button>
          </div>
          {updateProgressMutation.isLoading && <p>Updating progress...</p>}
        </div>
      )}

      {/* Display Score */}
      {haveAccepted && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Score: <span className="text-blue-500">{project?.score || 0}%</span>
          </h3>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
