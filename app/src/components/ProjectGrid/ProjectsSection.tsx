// React
import { Dispatch, ReactElement, SetStateAction } from 'react';

// Custom Components
import Project from './ProjectRow/ProjectRow';

// Types
import { TaggedRepoData } from '../../types';

// Custom styles
import './ProjectsSection.css';

interface Props {
    projects: TaggedRepoData[];
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const ProjectsSection = ({
    projects,
    setSelectedProject,
}: Props): ReactElement => {
    return (
        <section id="projects">
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
        </section>
    );
};

export default ProjectsSection;
