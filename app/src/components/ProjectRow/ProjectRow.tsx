// React
import { SetStateAction, Dispatch } from 'react';

// Components
import ThumbnailCard from './ThumbnailCard';
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
            <ThumbnailCard projectData={projectData} />
            <DORACard project={projectData} />
            <CodeQualityCard project={projectData} />
        </ul>
    );
};

export default ProjectRow;
