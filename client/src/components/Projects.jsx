import { useQuery } from "@apollo/client";
import Spinner from './Spinner'
import ProjectCard from './ProjectCard'
import { GET_PROJECTS } from "../queries/projectQueries";

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default Projects