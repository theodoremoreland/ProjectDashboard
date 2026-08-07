// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

// Styles
import './Topics.css';

interface Props {
    projectData: TaggedRepoData;
}

const Topics = ({ projectData }: Props): ReactElement => {
    return <div className="Topics"></div>;
};

export default Topics;
 