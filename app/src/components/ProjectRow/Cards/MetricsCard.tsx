// React
import { ReactElement, useCallback, useMemo } from 'react';

// Third party
import { ChartsAxisData, RadarChart } from '@mui/x-charts';

// Custom
import { convertSonarScoreToGrade, inverseSonarScore } from './Cards.utils';
import { REPO_OWNER } from '../../../constants/RepoOwner';

// Components
import Corner from '../../Corner/Corner';
import LayeredBar from '../../LayeredBar/LayeredBar';
import GlyphLane from '../../GlyphLane/GlyphLane';

// Types
import { SonarMeasures, TaggedRepoData } from '../../../types';

// Images
import DeleteHistoryIcon from '../../../assets/images/icons/delete_history.svg?react';
import EventUpcomingIcon from '../../../assets/images/icons/event_upcoming.svg?react';
import HourglassArrowUpIcon from '../../../assets/images/icons/hourglass_arrow_up.svg?react';
import PlannerReviewIcon from '../../../assets/images/icons/planner_review.svg?react';
import RunningWithErrorsIcon from '../../../assets/images/icons/running_with_errors.svg?react';

// Styles
import './MetricsCard.css';

const SonarCloudBaseUrl: string = `https://sonarcloud.io/project/issues?id=${REPO_OWNER}_`;
const radar = {
    max: 5,
    startAngle: 0,
    metrics: ['Maintainability', 'Reliability', 'Security'],
};
const radarColors: string[] = ['var(--secondary-color)'];
const radarStripeColor = (index: number): string => {
    switch (index) {
        case 0:
            return 'darkred';
        case 1:
            return 'orangered';
        case 2:
            return 'yellow';
        case 3:
            return 'yellowgreen';
        case 4:
            return 'lime';
        default:
            return 'lime';
    }
};
const radarSlotProps = { tooltip: { trigger: 'axis' as const } };

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
    const onAxisClick = useCallback(
        (_: MouseEvent, d: ChartsAxisData | null): void => {
            const SoftwareQualityLink: Record<string, string> = {
                security: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=SECURITY&s=IMPACT_RANK`,
                maintainability: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=MAINTAINABILITY&s=IMPACT_RANK`,
                reliability: `${SonarCloudBaseUrl}${projectData.name}&impactSoftwareQualities=RELIABILITY&s=IMPACT_RANK`,
            };
            const key = d?.axisValue;

            if (key) {
                const _key = String(key).toLowerCase();

                window.open(SoftwareQualityLink[_key], '_blank');
            }
        },
        [projectData.name]
    );
    const radarData = useMemo(() => {
        return [
            {
                id: 'software-quality',
                label: 'Grade',
                fillArea: true,
                data: [
                    sonarMeasures?.metrics.sqale_rating || 0,
                    sonarMeasures?.metrics.reliability_rating || 0,
                    sonarMeasures?.metrics.security_rating || 0,
                ].map(inverseSonarScore),
                valueFormatter: (value: number) =>
                    convertSonarScoreToGrade(value),
            },
        ];
    }, [sonarMeasures]);
    const topData = useMemo(() => {
        return {
            label: 'Lines of Code',
            value: sonarMeasures?.metrics.ncloc || 0,
            format: 'int' as const,
        };
    }, [sonarMeasures]);
    const bottomData = useMemo(() => {
        return {
            label: 'Test Coverage',
            value: sonarMeasures?.metrics.coverage || 0,
            format: 'percent' as const,
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
                        desc="A radar chart illustrating code quality grades for project."
                        colors={radarColors}
                        height={270}
                        hideLegend
                        loading={isSonarMeasuresFetching}
                        series={radarData}
                        stripeColor={radarStripeColor}
                        divisions={5}
                        radar={radar}
                        slotProps={radarSlotProps}
                        onAxisClick={onAxisClick}
                    />
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
                <ul
                    className={`dora-container ${hasSettled ? 'show' : 'hide'}`}
                >
                    <li title="Lead Time for Changes (LTFC): Measures elapsed time from the initial commit timestamp to when the PR is merged/deployed">
                        <span className="label-container">
                            <EventUpcomingIcon className="icon" />
                            <p>Lead Time</p>
                        </span>
                        <span className="dots"></span>
                        <p className="metric">1w</p>
                    </li>
                    <li title="Deployment Frequency (DF): Counts total successful production deployments over a specific timeframe">
                        <span className="label-container">
                            <PlannerReviewIcon className="icon" />
                            <p>Frequency</p>
                        </span>
                        <span className="dots"></span>
                        <p className="metric">2pw</p>
                    </li>
                    <li title="Failed Deployment Recovery Time (FDRT): Time to recover from a failed deployment">
                        <span className="label-container">
                            <HourglassArrowUpIcon className="icon" />
                            <p>Recovery Time</p>
                        </span>
                        <span className="dots"></span>
                        <p className="metric">2h</p>
                    </li>
                    <li title="Change Failure Rate (CFR): Percentage of total deployments that resulted in a hotfix PR or incident issue">
                        <span className="label-container">
                            <RunningWithErrorsIcon className="icon" />
                            <p>Failure Rate</p>
                        </span>
                        <span className="dots"></span>
                        <p className="metric">5%</p>
                    </li>
                    <li title="Deployment rework rate (DRR): Percentage of deployments that are unplanned work to fix bugs">
                        <span className="label-container">
                            <DeleteHistoryIcon className="icon" />
                            <p className="label-container">Rework Rate</p>
                        </span>
                        <span className="dots"></span>
                        <p className="metric">3%</p>
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
