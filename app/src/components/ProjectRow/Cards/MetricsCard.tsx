// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

const MetricsCard = ({
    projectData,
}: {
    projectData: TaggedRepoData;
}): ReactElement => {
    return (
        <li className="project-card metrics">
            <h3>Metrics</h3>
            <ul>
                <li>Deployment Frequency</li>
                <li>Lead Time for Changes</li>
                <li>Change Failure Rate</li>
                <li>Failed Deployment Recovery Time</li>
                <li>Time to Restore Service</li>
            </ul>
            <p>{projectData.name}</p>
        </li>
    );
};

export default MetricsCard;
