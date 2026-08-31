// React
import { ReactElement } from 'react';

// Custom
import { convertToSonarGrade } from '../../../utils/convertToSonarGrade';

// Components
import Corner from '../../Corner/Corner';

// Types
import { SonarMeasures, TaggedRepoData } from '../../../types';

// Styles
import './MetricsCard.css';

const MetricsCard = ({
    projectData,
    sonarMeasures,
    isSonarMeasuresFetching,
}: {
    projectData: TaggedRepoData;
    sonarMeasures: SonarMeasures | undefined;
    isSonarMeasuresFetching: boolean;
}): ReactElement => {
    return (
        <li className="project-card-container">
            <div className="project-card MetricsCard">
                <Corner position="top-left" />
                <div className="dora-container">
                    <ul className="metrics-list">
                        <li>
                            <p>Deployment Frequency</p>
                            <p className="grade">2pw</p>
                        </li>
                        <li>
                            <p>Lead Time for Changes</p>
                            <p className="grade">1w</p>
                        </li>
                        <li>
                            <p>Change Failure Rate</p>
                            <p className="grade">5%</p>
                        </li>
                        <li>
                            <p>Failed Deployment Recovery Time</p>
                            <p className="grade">2h</p>
                        </li>
                        <li>
                            <p>Time to Restore Service</p>
                            <p className="grade">30m</p>
                        </li>
                    </ul>
                </div>
                <div className="metrics-label-container">
                    <h3>DORA Metrics</h3>/<h3>Code Quality</h3>
                </div>
                <div className="code-quality-container">
                    <ul className="metrics-list">
                        <li>
                            <p>Maintainability</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <p className="grade">
                                    {convertToSonarGrade(
                                        sonarMeasures?.metrics.sqale_rating
                                    )}
                                </p>
                            )}
                        </li>
                        <li>
                            <p>Test Coverage</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <p className="grade">
                                    {convertToSonarGrade(
                                        sonarMeasures?.metrics.coverage
                                    )}
                                </p>
                            )}
                        </li>
                        <li>
                            <p>Reliability</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <p className="grade">
                                    {convertToSonarGrade(
                                        sonarMeasures?.metrics
                                            .reliability_rating
                                    )}
                                </p>
                            )}
                        </li>
                        <li>
                            <p>Security</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <p className="grade">
                                    {convertToSonarGrade(
                                        sonarMeasures?.metrics.security_rating
                                    )}
                                </p>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="deployment-button-container">
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
