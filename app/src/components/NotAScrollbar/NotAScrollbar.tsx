// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../types';

// Styles
import './NotAScrollbar.css';

interface Props {
    scrollToProject: (id: string) => void;
    projects: TaggedRepoData[];
    selectedProject: TaggedRepoData;
}

const NotAScrollbar = ({
    scrollToProject,
    projects,
    selectedProject,
}: Props): ReactElement => {
    return (
        <div id="NotAScrollbar">
            <ol id="project-options">
                {projects?.map((project) => (
                    <li
                        key={project.name}
                        className={`interactive project-option ${selectedProject.name === project.name ? 'selected' : ''}`}
                    >
                        <button
                            id={`scroll-to-${project.name}-button`}
                            onClick={() => scrollToProject(project.name)}
                        ></button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default NotAScrollbar;
