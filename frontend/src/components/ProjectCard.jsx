import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ProjectCard({ project }) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <p className="text-sm text-gray-500 mt-1">Status: {project.status}</p>
      <p className="text-sm text-gray-500">Score: {project.score}</p>
      <Link
        to={`/projects/${project._id}`}
        className="inline-flex items-center mt-4 text-blue-500 hover:underline"
      >
        View Details <FaArrowRight className="ml-2" />
      </Link>
    </div>
  );
}

export default ProjectCard;
