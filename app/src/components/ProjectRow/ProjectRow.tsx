// React
import { SetStateAction, Dispatch } from 'react';

// Components
import Sidebar from './Sidebar/Sidebar';
import ThumbnailCard from './Cards/ThumbnailCard';
import MetricsCard from './Cards/MetricsCard';
import ActivityCard from './Cards/ActivityCard';

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
        <div
            id={`${projectData.name}`}
            className="project-row"
            onMouseEnter={() => setSelectedProject(projectData)}
        >
            <div className="project-row-content">
                <Sidebar />
                <ul className="project-cards">
                    <ThumbnailCard projectData={projectData} />
                    <MetricsCard projectData={projectData} />
                    <ActivityCard projectData={projectData} />
                </ul>
            </div>
        </div>
    );
};

export default ProjectRow;
