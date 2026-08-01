// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../types';

const DORACard = ({ project }: { project: TaggedRepoData }): ReactElement => {
    return (
        <li className="project-card dora-metrics">
            <ul>
                <li>Deployment Frequency</li>
                <li>Lead Time for Changes</li>
                <li>Change Failure Rate</li>
                <li>Failed Deployment Recovery Time</li>
                <li>Time to Restore Service</li>
            </ul>
        </li>
    );
};

export default DORACard;
