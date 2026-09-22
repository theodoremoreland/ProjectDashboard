// React
import { ReactElement, useMemo } from 'react';

// Third party
import { BarChart, SparkLineChart } from '@mui/x-charts';

// Custom
import { getCommitsPerWeek, getRecentDelta } from './ActivityCard.util';

// Components
import Corner from '../../Corner/Corner';
import GlyphLane from '../../GlyphLane/GlyphLane';

// Types
import { CommitActivityData, TaggedRepoData, Commit } from '../../../types';

// Styles
import './ActivityCard.css';

interface Props {
    projectData: TaggedRepoData;
    commits: Commit[] | undefined;
    commitActivity: CommitActivityData | undefined;
    isRecentCommitsFetching?: boolean;
    isCommitActivityFetching?: boolean;
}

const barX = [
    {
        id: 'x-axis-1',
        scaleType: 'band' as const,
        data: ['Additions', 'Deletions'] as const,
    },
];
const barY = [
    {
        id: 'y-axis-1',
        colorMap: {
            type: 'piecewise' as const,
            thresholds: [0],
            colors: ['darkred', '#26ff04'],
        },
    },
];
const barGrid = { horizontal: true, vertical: true };

const ActivityCard = ({
    projectData,
    commits,
    commitActivity,
    isRecentCommitsFetching,
    isCommitActivityFetching,
}: Props): ReactElement => {
    const commitsPerWeek: number[] = useMemo(
        () => getCommitsPerWeek(commitActivity),
        [commitActivity]
    );
    const recentDelta: [number, number] = useMemo(
        () => getRecentDelta(commits),
        [commits]
    );
    const barSeries = useMemo(
        () => [
            {
                id: 'activity-delta-series',
                data: recentDelta,
                barLabel: 'value' as const,
            },
        ],
        [recentDelta]
    );

    return (
        <li className="project-card-container">
            <div className="project-card ActivityCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
                <Corner position="top-right" />
                <Corner position="bottom-left" />
                <div className="top">
                    <BarChart
                        className="DeltaBarChart"
                        height={270}
                        xAxis={barX}
                        yAxis={barY}
                        series={barSeries}
                        grid={barGrid}
                    />
                </div>
                <div className={`middle`}>
                    <GlyphLane />
                    <div
                        className={`sparkline-container ${isCommitActivityFetching ? '' : 'loaded'}`}
                    >
                        <SparkLineChart
                            data={commitsPerWeek}
                            color="#c0fe04"
                            height={20}
                            showTooltip
                            showHighlight
                        />
                    </div>
                    <GlyphLane />
                </div>
                <div className="bottom">
                    <div className=" commits-container">
                        <h3>Recent commits</h3>
                        <ul className="commits">
                            {isRecentCommitsFetching && (
                                <p>Loading commits...</p>
                            )}
                            {commits?.map((commit, index) => (
                                <li key={index} className="commit">
                                    <h4>{commit.message}</h4>
                                    <p>
                                        {commit.committedDate
                                            ? new Date(
                                                  commit.committedDate
                                              ).toLocaleString()
                                            : 'Unknown date'}
                                    </p>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={commit.commitUrl}
                                    >
                                        View code diff on GitHub
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="trailing-text">
                <p>Activity</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default ActivityCard;
