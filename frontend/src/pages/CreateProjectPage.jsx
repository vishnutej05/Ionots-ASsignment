import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../services/ProjectService";
export default function CreateProjectPage() {
  const queryClient = useQueryClient();

  // useMutation for creating a new project
  const createProjectMutation = useMutation({
    mutationFn: async (newProject) => {
      return await axios.post(API_URL, newProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]); // Refetch projects list
      <link></link>;
    },
  });

  const handleCreateProject = (event) => {
    event.preventDefault();
    const newProject = {
      title: event.target.name.value,
      description: event.target.description.value,
      assignedTo: event.target.assigned.value,
      totalTasks: event.target.totalTasks.value,
    };
    createProjectMutation.mutate(newProject);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <form onSubmit={handleCreateProject} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="assigned"
          placeholder="Assigned to"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="totalTasks"
          placeholder="Total no of tasks in number (Arrpox)"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Project
        </button>
      </form>
      {createProjectMutation.isLoading && <p>Creating...</p>}
      {createProjectMutation.isError && (
        <p className="text-red-500">
          Error: {createProjectMutation.error.message}
        </p>
      )}
      {createProjectMutation.isSuccess && (
        <p className="text-green-500">Project created successfully!</p>
      )}
    </div>
  );
}
