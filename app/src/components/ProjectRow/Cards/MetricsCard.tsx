// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

// Styles
import './MetricsCard.css';

const MetricsCard = ({
    projectData,
}: {
    projectData: TaggedRepoData;
}): ReactElement => {
    return (
        <li className="project-card-container">
            <div className="project-card MetricsCard">
                <div className="top-half">
                    <h3>DORA Metrics</h3>
                    <ul>
                        <li>Deployment Frequency</li>
                        <li>Lead Time for Changes</li>
                        <li>Change Failure Rate</li>
                        <li>Failed Deployment Recovery Time</li>
                        <li>Time to Restore Service</li>
                    </ul>
                    <h3>Code Quality</h3>
                    <ul>
                        <li>Maintainability</li>
                        <li>Test Coverage</li>
                        <li>Reliability</li>
                        <li>Security</li>
                    </ul>
                </div>
                <div className="bottom-half">
                    {projectData.demo_link &&
                        projectData.name !== 'ProjectDashboard' && (
                            <a
                                className="view-deployment-link interactive"
                                href={projectData.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Click to view a live deployment of the ${projectData.name} project.`}
                            >
                                <button className="view-deployment">
                                    View Deployment{' '}
                                    <span className="circle"></span>
                                </button>
                            </a>
                        )}
                </div>
            </div>
            <div className="trailing-text">
                <p>Metrics</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default MetricsCard;
