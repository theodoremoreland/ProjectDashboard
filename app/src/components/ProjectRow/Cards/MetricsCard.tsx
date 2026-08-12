// React
import { ReactElement } from 'react';

// Components
import Corner from '../../Corner/Corner';

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
                <Corner position="top-left" />
                <div className="top-half">
                    <h3>DORA Metrics</h3>
                    <ul className="metrics-list">
                        <li>
                            <p>Deployment Frequency</p>
                            <p>2 per week</p>
                        </li>
                        <li>
                            <p>Lead Time for Changes</p>
                            <p>1 week</p>
                        </li>
                        <li>
                            <p>Change Failure Rate</p>
                            <p>5%</p>
                        </li>
                        <li>
                            <p>Failed Deployment Recovery Time</p>
                            <p>2 hours</p>
                        </li>
                        <li>
                            <p>Time to Restore Service</p>
                            <p>30 minutes</p>
                        </li>
                    </ul>
                    <h3>Code Quality</h3>
                    <ul className="metrics-list">
                        <li>
                            <p>Maintainability</p>
                            <p>A</p>
                        </li>
                        <li>
                            <p>Test Coverage</p>
                            <p>85%</p>
                        </li>
                        <li>
                            <p>Reliability</p>
                            <p>B</p>
                        </li>
                        <li>
                            <p>Security</p>
                            <p>A</p>
                        </li>
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
