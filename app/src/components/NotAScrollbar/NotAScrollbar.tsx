// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../types';

// Styles
import './NotAScrollbar.css';

interface Props {
    projects: TaggedRepoData[];
    selectedProject: TaggedRepoData;
}

const NotAScrollbar = ({ projects, selectedProject }: Props): ReactElement => {
    return (
        <div id="NotAScrollbar">
            <ol id="project-options">
                {projects?.map((project) => (
                    <li
                        key={project.name}
                        className={`interactive project-option ${selectedProject.name === project.name ? 'selected' : ''}`}
                    >
                        <a
                            id={`${project.name}-anchor`}
                            href={`#${project.name}`}
                        ></a>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default NotAScrollbar;
