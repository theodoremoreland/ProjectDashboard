// React
import { ReactElement, useMemo } from 'react';

// Third party
import { RadarAxis, RadarChart } from '@mui/x-charts';

// Custom
import { convertToSonarGrade } from '../../../utils/convertToSonarGrade';
import { REPO_OWNER } from '../../../constants/RepoOwner';

// Components
import Corner from '../../Corner/Corner';
import LayeredBar from '../../LayeredBar/LayeredBar';
import GlyphLane from '../../GlyphLane/GlyphLane';

// Types
import { SonarMeasures, TaggedRepoData } from '../../../types';

// Styles
import './MetricsCard.css';

const SonarCloudBaseUrl: string = `https://sonarcloud.io/project/issues?id=${REPO_OWNER}_`;

interface Props {
    hasSettled: boolean;
    projectData: TaggedRepoData;
    sonarMeasures: SonarMeasures | undefined;
    isSonarMeasuresFetching: boolean;
}

const MetricsCard = ({
    hasSettled,
    projectData,
    sonarMeasures,
    isSonarMeasuresFetching,
}: Props): ReactElement => {
    const hasValidDemoLink: boolean =
        projectData.name !== 'ProjectDashboard' && projectData.demo_link !== '';
    const SoftwareQualityLink: Record<string, string> = {
        security: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=SECURITY&s=IMPACT_RANK`,
        maintainability: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=MAINTAINABILITY&s=IMPACT_RANK`,
        reliability: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=RELIABILITY&s=IMPACT_RANK`,
    };
    const radarData = useMemo(() => {
        return [
            {
                id: 'software-quality',
                label: 'Grade',
                data: [
                    sonarMeasures?.metrics.sqale_rating || 0,
                    sonarMeasures?.metrics.reliability_rating || 0,
                    sonarMeasures?.metrics.security_rating || 0,
                ],
            },
        ];
    }, [sonarMeasures]);
    const topData = useMemo(() => {
        return {
            label: 'Lines of Code',
            value: sonarMeasures?.metrics.ncloc || 0,
        };
    }, [sonarMeasures]);
    const bottomData = useMemo(() => {
        return {
            label: 'Test Coverage',
            value: sonarMeasures?.metrics.coverage || 0,
        };
    }, [sonarMeasures]);
    return (
        <li className="project-card-container">
            <div className="project-card MetricsCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
                <Corner position="top-right" />
                <Corner position="bottom-left" />
                <div
                    className={`software-quality-container ${hasSettled ? 'show' : 'hide'}`}
                >
                    <RadarChart
                        className="RadarChart"
                        desc="A radar chart illustrating code quality grades for project"
                        colors={['var(--secondary-color)']}
                        height={250}
                        hideLegend
                        series={radarData}
                        stripeColor={(index: number) =>
                            index % 2 === 0
                                ? 'var(--secondary-color)'
                                : 'var(--tertiary-color)'
                        }
                        divisions={5}
                        radar={{
                            max: 5,
                            startAngle: 0,
                            metrics: [
                                'Maintainability',
                                'Reliability',
                                'Security',
                            ],
                        }}
                        slotProps={{ tooltip: { trigger: 'axis' } }}
                    >
                        <RadarAxis
                            metric="Maintainability"
                            divisions={5}
                            labelOrientation="rotated"
                            angle={36}
                        />
                    </RadarChart>
                    <LayeredBar
                        className="code-coverage"
                        topData={topData}
                        bottomData={bottomData}
                    />
                </div>
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
