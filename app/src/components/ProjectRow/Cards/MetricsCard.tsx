// React
import { ReactElement } from 'react';

// Custom
import { convertToSonarGrade } from '../../../utils/convertToSonarGrade';
import { REPO_OWNER } from '../../../constants/RepoOwner';

// Components
import Corner from '../../Corner/Corner';
import GradeGraph from '../../GradeGraph/GradeGraph';
import GlyphLane from '../../GlyphLane/GlyphLane';

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
                <Corner position="top-right" />
                <Corner position="bottom-left" />
                <ul className="software-quality-container">
                    <li>
                        <div className="quality-label-container">
                            <p>Lines of Code</p>
                            <GradeGraph
                                measure={sonarMeasures?.metrics.ncloc}
                                type="basic"
                            />
                        </div>
                        {isSonarMeasuresFetching ? (
                            <p className="grade">...</p>
                        ) : (
                            <p className="grade">
                                {sonarMeasures?.metrics.ncloc}
                            </p>
                        )}
                    </li>
                    <li>
                        <div className="quality-label-container">
                            <p>Maintainability</p>
                            <GradeGraph
                                measure={sonarMeasures?.metrics.sqale_rating}
                                type="point"
                            />
                        </div>
                        {isSonarMeasuresFetching ? (
                            <p className="grade">...</p>
                        ) : (
                            <a
                                className="grade-link"
                                href={SoftwareQualityLink.maintainability}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Click to view the maintainability rating on SonarCloud.`}
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
                        <div className="quality-label-container">
                            <p>Reliability</p>
                            <GradeGraph
                                measure={
                                    sonarMeasures?.metrics.reliability_rating
                                }
                                type="point"
                            />
                        </div>
                        {isSonarMeasuresFetching ? (
                            <p className="grade">...</p>
                        ) : (
                            <a
                                className="grade-link"
                                href={SoftwareQualityLink.reliability}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Click to view the reliability rating on SonarCloud.`}
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
                        <div className="quality-label-container">
                            <p>Security</p>
                            <GradeGraph
                                measure={sonarMeasures?.metrics.security_rating}
                                type="point"
                            />
                        </div>
                        {isSonarMeasuresFetching ? (
                            <p className="grade">...</p>
                        ) : (
                            <a
                                className="grade-link"
                                href={SoftwareQualityLink.security}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Click to view the security rating on SonarCloud.`}
                            >
                                <p
                                    className={`grade ${convertToSonarGrade(sonarMeasures?.metrics.security_rating)}`}
                                >
                                    {convertToSonarGrade(
                                        sonarMeasures?.metrics.security_rating
                                    )}
                                </p>
                            </a>
                        )}
                    </li>
                    <li>
                        <div className="quality-label-container">
                            <p>Test Coverage</p>
                            <GradeGraph
                                measure={sonarMeasures?.metrics.coverage}
                                type="percentage"
                            />
                        </div>
                        {isSonarMeasuresFetching ? (
                            <p className="grade">...</p>
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
                </ul>
                <div className="middle">
                    <GlyphLane />
                    <div className="MetricsCard__header">
                        <h3>Software Quality</h3>x<h3>DORA Metrics</h3>
                    </div>
                    <GlyphLane />
                </div>
                <ul className="dora-container">
                    <li title="Measures elapsed time from the initial commit timestamp to when the PR is merged/deployed">
                        <p>Lead Time for Changes</p>
                        <p className="grade">1w</p>
                    </li>
                    <li title="Counts total successful production deployments over a specific timeframe">
                        <p>Deployment Frequency</p>
                        <p className="grade">2pw</p>
                    </li>
                    <li title="Time to recover from a failed deployment">
                        <p>Failed Deployment Recovery Time</p>
                        <p className="grade">2h</p>
                    </li>
                    <li title="Percentage of total deployments that resulted in a hotfix PR or incident issue">
                        <p>Change Failure Rate</p>
                        <p className="grade">5%</p>
                    </li>
                    <li title="Percentage of deployments that are unplanned work to fix bugs">
                        <p>Deployment rework rate</p>
                        <p className="grade">30m</p>
                    </li>
                    <div className="deployment-button-container">
                        <a
                            className={`view-deployment-link ${!hasValidDemoLink ? 'disabled' : ''}`}
                            href={
                                hasValidDemoLink
                                    ? projectData.demo_link
                                    : undefined
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title={
                                hasValidDemoLink
                                    ? `Click to visit an active deployment of the ${projectData.name} project.`
                                    : undefined
                            }
                        >
                            <button
                                className={`view-deployment ${!hasValidDemoLink ? 'disabled' : ''}`}
                                disabled={!hasValidDemoLink}
                            >
                                <span>View Deployment</span>{' '}
                                {hasValidDemoLink && (
                                    <span className="circle"></span>
                                )}
                            </button>
                        </a>
                    </div>
                </ul>
            </div>
            <div className="trailing-text">
                <p>Metrics</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default MetricsCard;
