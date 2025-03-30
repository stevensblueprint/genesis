import { Card } from "antd";

interface ProjectCardProps {
    imageUrl: string;
    title: string;
    alt: string;
}

const ProjectCard = ({ imageUrl, title, alt }: ProjectCardProps) => {
    return (
        <Card hoverable style={{width: 360, height: 400}}>
            <img src={imageUrl} alt={alt} width={240} height={240} className="m-auto"/>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center py-10">{title}</h2>
        </Card>
    );
}

export default ProjectCard;