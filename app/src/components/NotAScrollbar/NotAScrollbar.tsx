// React
import { ReactElement } from 'react';

// Components
import Barcode from '../Barcode/Barcode';
import Corner from '../Corner/Corner';

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
                {projects?.map((project, index) => (
                    <li
                        key={project.name}
                        className={`project-option ${selectedProject.name === project.name ? 'selected' : ''}`}
                    >
                        <button
                            id={`scroll-to-${project.name}-button`}
                            onClick={() => scrollToProject(project.name)}
                        >
                            <span className="index">-{index + 1}</span>
                        </button>
                        <span className="project-name">
                            <Corner position="top-left" />
                            <Corner position="bottom-right" />
                            <Corner position="top-right" />
                            <Corner position="bottom-left" />
                            <Barcode value={project.name} />
                            <p>{project.name}</p>
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default NotAScrollbar;
