// React
import { SetStateAction, Dispatch } from 'react';

// Components
import ScreenshotCard from './ScreenshotCard';
import DORACard from './DORACard';
import CodeQualityCard from './CodeQualityCard';

// Types
import { TaggedRepoData } from '../../types';

// Custom styles
import './ProjectRow.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const ProjectRow = ({ projectData, setSelectedProject }: Props) => {
    return (
        <ul
            className="project-row"
            onMouseEnter={() => setSelectedProject(projectData)}
        >
            <li>
                <ScreenshotCard projectData={projectData} />
            </li>
            <li>
                <DORACard project={projectData} />
            </li>
            <li>
                <CodeQualityCard project={projectData} />
            </li>
        </ul>
    );
};

export default ProjectRow;
