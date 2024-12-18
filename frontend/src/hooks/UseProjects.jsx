import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/ProjectService";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"], 
    queryFn: getAllProjects, 
  });
};
