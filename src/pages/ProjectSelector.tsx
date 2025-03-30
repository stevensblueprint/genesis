import logo from "../assets/logo_banner_negative.png";
import { Button } from "antd";
import react from "../assets/project_logos/react.svg";
import spring from "../assets/project_logos/spring_boot.svg";
import vite from "../assets/project_logos/vite.svg";
import lume from "../assets/project_logos/lume.svg";
import ProjectCard from "../components/ProjectCard";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const ProjectSelector = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const projects = [
    { imageUrl: vite, title: "Vite", alt: "Vite", path: "/vite_form" },
    {
      imageUrl: spring,
      title: "Spring Boot",
      alt: "Spring Boot",
      path: "/spring_form",
    },
    { imageUrl: react, title: "React", alt: "React", path: "/react_form" },
    { imageUrl: lume, title: "Lume", alt: "Lume", path: "/lume_form" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-[#0078e8]">
        <div className="flex items-center py-4 px-4">
          <img
            src={logo}
            alt="Stevens Blueprint Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex items-center">
          <Button
            type="default"
            className="mr-4"
            ghost
            onClick={() => navigate("/deployments")}
          >
            Deployments
          </Button>
          <Button type="default" className="mr-4" ghost onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Select project type
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            To start a deployment, select an existing template
          </p>
          <div className="py-8 w-full px-8">
            <div className="grid grid-cols-4 gap-8 w-full">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  imageUrl={project.imageUrl}
                  title={project.title}
                  alt={project.alt}
                  path={project.path}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;
