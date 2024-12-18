import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/UseProjects";
function HomePage() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <Link
          to="/create-project"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create New Project
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.length === 0 && <h1>No projects available create them !!</h1>}
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
