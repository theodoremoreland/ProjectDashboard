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
        <li className="project-card-container">
            <div className="project-card MetricsCard">
                <h3>Metrics</h3>
                <ul>
                    <li>Deployment Frequency</li>
                    <li>Lead Time for Changes</li>
                    <li>Change Failure Rate</li>
                    <li>Failed Deployment Recovery Time</li>
                    <li>Time to Restore Service</li>
                </ul>
                {projectData.demo_link &&
                    projectData.name !== 'ProjectDashboard' && (
                        <a
                            className="live-demo-link interactive"
                            href={projectData.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Click to view a live deployment of the ${projectData.name} project.`}
                        >
                            <button className="live-demo">
                                View Deployment <span className="circle"></span>
                            </button>
                        </a>
                    )}
            </div>
            <div className="trailing-text">
                <p>Metrics</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default MetricsCard;
