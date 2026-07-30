// React
import { SetStateAction, Dispatch } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

// Images
import alt from '../../../assets/images/under-construction-thumbnail.jpg';

// Custom styles
import './ProjectRow.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const ProjectRow = ({ projectData, setSelectedProject }: Props) => {
    return <div className="project-row"></div>;
};

export default ProjectRow;
