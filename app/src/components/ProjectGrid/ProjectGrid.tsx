// React
import { Dispatch, ReactElement, SetStateAction } from "react";

// Custom Components
import Project from "./Project/Project";

// Types
import { TaggedRepoData } from "../../types";

// Custom styles
import "./ProjectGrid.css";

interface Props {
    projects: TaggedRepoData[];
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const ProjectGrid = ({ projects, setSelectedProject }: Props): ReactElement => {
    return (
        <section id="project-grid">
            {projects &&
                projects.map((project) => {
                    return (
                        <Project
                            key={project.name}
                            projectData={project}
                            setSelectedProject={setSelectedProject}
                        />
                    );
                })}
            <div id="project-grid-overlay"></div>
        </section>
    );
};

export default ProjectGrid;
