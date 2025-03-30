import logo from "../assets/logo_banner.png";
import { Button } from "antd";
import react from "../assets/project_logos/react.svg";
import spring from "../assets/project_logos/spring_boot.svg";
import vite from "../assets/project_logos/vite.svg";
import ProjectCard from "../components/ProjectCard";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ProjectSelector = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return (
    <div className="flex flex-col">
    <div className="flex items-center justify-between">
        <div className="flex items-center py-4 px-4">
            <img src={logo} alt="Stevens Blueprint Logo" className="h-12 w-auto"/>
        </div>
        <Button type="primary" className="mr-4" onClick={signOut}>Logout</Button>
    </div>
    <div className="flex-grow flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Select project type
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          To start a project, select an existing template
        </p>
        <div className="py-16 flex justify-center gap-8">
          <ProjectCard
            imageUrl={react}
            title="React"
            alt="React"
          />
          <ProjectCard
            imageUrl={spring}
            title="Spring Boot"
            alt="Spring Boot"
          />
          <ProjectCard
            imageUrl={vite}
            title="Vite"
            alt="Vite"
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProjectSelector;

