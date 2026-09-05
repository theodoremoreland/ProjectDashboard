// React
import { ReactElement } from 'react';

// Third party
import { BarChart, SparkLineChart } from '@mui/x-charts';

// Custom
import { getCommitsPerWeek, getRecentDelta } from './ActivityCard.util';

// Components
import Corner from '../../Corner/Corner';

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

const ActivityCard = ({
    projectData,
    commits,
    commitActivity,
    isRecentCommitsFetching,
    isCommitActivityFetching,
}: Props): ReactElement => {
    const commitsPerWeek: number[] = getCommitsPerWeek(commitActivity);
    const recentDelta: [number, number] = getRecentDelta(commits);

    return (
        <li className="project-card-container">
            <div className="project-card ActivityCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
                <div className="top">
                    <BarChart
                        height={300}
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: ['Additions', 'Deletions'],
                            },
                        ]}
                        yAxis={[
                            {
                                colorMap: {
                                    type: 'piecewise',
                                    thresholds: [0],
                                    colors: ['red', 'green'],
                                },
                            },
                        ]}
                        series={[{ data: recentDelta }]}
                        barLabel="value"
                        grid={{ horizontal: true, vertical: true }}
                        sx={{
                            // Change axis line color (axis path/ticks)
                            '.MuiChartsAxis-root .MuiChartsAxis-line': {
                                stroke: '#f4f1f18e',
                                strokeWidth: 2,
                            },
                            'MuiChartsAxis-tick': {
                                stroke: '#f4f1f18e',
                            },
                            // Change axis tick labels color
                            '.MuiChartsAxis-tickLabel': {
                                fill: '#e6e6e669',
                                fontSize: 12,
                            },
                            // Change grid lines color
                            '.MuiChartsAxis-grid': {
                                stroke: '#e0e0e0',
                                strokeDasharray: '2 2', // optional dashed grid lines
                            },
                            'MuiChartsGrid-line': {
                                stroke: '#e0e0e0',
                            },
                            // Targets the labels displayed on the bars
                            '& .MuiBarLabel-root': {
                                fill: '#c8c8c8',
                            },
                        }}
                    />
                </div>
                <div
                    className={`middle sparkline-container ${isCommitActivityFetching ? '' : 'loaded'}`}
                >
                    <SparkLineChart
                        data={commitsPerWeek}
                        colors={['#c0fe04']}
                        height={20}
                        showTooltip
                        showHighlight
                    />
                </div>
                <div className="bottom commits-container">
                    <h3>Recent commits</h3>
                    <ul className="commits">
                        {isRecentCommitsFetching && <p>Loading commits...</p>}
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
                                    className="interactive"
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
            <div className="trailing-text">
                <p>Activity</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default ActivityCard;
