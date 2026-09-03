// React
import { ReactElement } from 'react';

// Custom
import { convertToSonarGrade } from '../../../utils/convertToSonarGrade';
import { REPO_OWNER } from '../../../constants/RepoOwner';

// Components
import Corner from '../../Corner/Corner';

// Types
import { SonarMeasures, TaggedRepoData } from '../../../types';

// Styles
import './MetricsCard.css';

const SonarCloudBaseUrl: string = `https://sonarcloud.io/project/issues?id=${REPO_OWNER}_`;

const MetricsCard = ({
    projectData,
    sonarMeasures,
    isSonarMeasuresFetching,
}: {
    projectData: TaggedRepoData;
    sonarMeasures: SonarMeasures | undefined;
    isSonarMeasuresFetching: boolean;
}): ReactElement => {
    const hasValidDemoLink: boolean =
        projectData.name !== 'ProjectDashboard' && projectData.demo_link !== '';
    const SoftwareQualityLink: Record<string, string> = {
        security: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=SECURITY&s=IMPACT_RANK`,
        maintainability: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=MAINTAINABILITY&s=IMPACT_RANK`,
        reliability: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=RELIABILITY&s=IMPACT_RANK`,
    };

    return (
        <li className="project-card-container">
            <div className="project-card MetricsCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
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
                    <h3>DORA Metrics</h3>x<h3>Software Quality</h3>
                </div>
                <div className="software-quality-container">
                    <ul className="metrics-list">
                        <li>
                            <p>Maintainability</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <a
                                    className="grade-link interactive"
                                    href={SoftwareQualityLink.maintainability}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Click to view the maintainability rating for the ${projectData.name} project on SonarCloud.`}
                                >
                                    <p
                                        className={`grade ${convertToSonarGrade(
                                            sonarMeasures?.metrics.sqale_rating
                                        )}`}
                                    >
                                        {convertToSonarGrade(
                                            sonarMeasures?.metrics.sqale_rating
                                        )}
                                    </p>
                                </a>
                            )}
                        </li>
                        <li>
                            <p>Test Coverage</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <p
                                    className={`grade ${convertToSonarGrade(
                                        sonarMeasures?.metrics.coverage
                                    )}`}
                                >
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
                                <a
                                    className="grade-link interactive"
                                    href={SoftwareQualityLink.reliability}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Click to view the reliability rating for the ${projectData.name} project on SonarCloud.`}
                                >
                                    <p
                                        className={`grade ${convertToSonarGrade(
                                            sonarMeasures?.metrics
                                                .reliability_rating
                                        )}`}
                                    >
                                        {convertToSonarGrade(
                                            sonarMeasures?.metrics
                                                .reliability_rating
                                        )}
                                    </p>
                                </a>
                            )}
                        </li>
                        <li>
                            <p>Security</p>
                            {isSonarMeasuresFetching ? (
                                <p className="grade">Fetching...</p>
                            ) : (
                                <a
                                    className="grade-link interactive"
                                    href={SoftwareQualityLink.security}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Click to view the security rating for the ${projectData.name} project on SonarCloud.`}
                                >
                                    <p
                                        className={`grade ${convertToSonarGrade(sonarMeasures?.metrics.security_rating)}`}
                                    >
                                        {convertToSonarGrade(
                                            sonarMeasures?.metrics
                                                .security_rating
                                        )}
                                    </p>
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="deployment-button-container">
                    <a
                        className={`view-deployment-link ${hasValidDemoLink ? 'interactive' : ''}`}
                        href={
                            hasValidDemoLink ? projectData.demo_link : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title={
                            hasValidDemoLink
                                ? `Click to view a live deployment of the ${projectData.name} project.`
                                : undefined
                        }
                    >
                        <button
                            className={`view-deployment ${hasValidDemoLink ? 'interactive' : 'disabled'}`}
                            disabled={!hasValidDemoLink}
                        >
                            <span>View Deployment</span>{' '}
                            {hasValidDemoLink && (
                                <span className="circle"></span>
                            )}
                        </button>
                    </a>
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
