import { Card } from "antd";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
    imageUrl: string;
    title: string;
    alt: string;
    path: string;
}

const ProjectCard = ({ imageUrl, title, alt, path }: ProjectCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return (
        <Card 
            hoverable 
            style={{width: 280, height: 280}} 
            onClick={handleClick}
            className="bg-gray-50 shadow-md hover:shadow-lg transition-shadow"
        >
            <img src={imageUrl} alt={alt} width={150} height={150} className="m-auto"/>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center py-10">{title}</h2>
        </Card>
    );
}

export default ProjectCard;