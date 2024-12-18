import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../services/ProjectService";
import ProjectDetails from "../components/ProjectDetails";
import Spinner from "../components/Spinner";

function ProjectPage() {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    retry: false, // Prevent infinite retries on error
  });

  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <p className="text-center text-red-500">
        {error.message || "Failed to load project details."}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ProjectDetails project={project} />
    </div>
  );
}

export default ProjectPage;
