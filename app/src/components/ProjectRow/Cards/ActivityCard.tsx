// React
import { ReactElement, useMemo } from 'react';

// Third party
import {
    BarChart,
    SparkLineChart,
    useItemTooltip,
    ChartsTooltipContainer,
} from '@mui/x-charts';

// Custom
import {
    DayCommits,
    getCommitsPerDay,
    getRecentDelta,
} from './ActivityCard.utils';

// Components
import Corner from '../../Corner/Corner';
import GlyphLane from '../../GlyphLane/GlyphLane';

// Types
import { CommitActivityData, TaggedRepoData, Commit } from '../../../types';

// Styles
import './ActivityCard.css';

const CustomToolTip = (): ReactElement | null => {
    const itemsTooltip = useItemTooltip<'bar'>();

    if (!itemsTooltip) {
        return null;
    }

    const { identifier, formattedValue } = itemsTooltip;

    const label: string =
        identifier.dataIndex === 0 ? 'Lines added' : 'Lines deleted';

    return (
        <ChartsTooltipContainer>
            <div className="CustomTooltip">
                <div key={identifier.seriesId} className="content">
                    <h4>{label}</h4>
                    <p className="note">*Includes dependencies and assets</p>
                    <hr />
                    <p className="value" data-index={identifier.dataIndex}>
                        {identifier.dataIndex === 0 ? `+` : null}
                        {formattedValue}
                    </p>
                </div>
            </div>
        </ChartsTooltipContainer>
    );
};

interface Props {
    hasSettled: boolean;
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
        label: 'Lines (Last 10 commits)',
        colorMap: {
            type: 'piecewise' as const,
            thresholds: [0],
            colors: ['darkred', 'lime'],
        },
    },
];
const barGrid = { horizontal: true, vertical: true };
const slots = { tooltip: CustomToolTip };

const ActivityCard = ({
    hasSettled,
    commits,
    commitActivity,
    isRecentCommitsFetching,
    isCommitActivityFetching,
}: Props): ReactElement => {
    const commitsByDay: DayCommits[] = useMemo(
        () => getCommitsPerDay(commitActivity),
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
    const sparklineX = useMemo(() => {
        return {
            type: 'time' as const,
            data: commitsByDay.map((dayCommits) => dayCommits.date),
            valueFormatter: (value: Date) => value.toLocaleDateString(),
        };
    }, [commitsByDay]);
    const sparklineData = useMemo(() => {
        return commitsByDay.map((dayCommits) => dayCommits.commitCount);
    }, [commitsByDay]);

    return (
        <li className="project-card-container">
            <div className="project-card ActivityCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
                <Corner position="top-right" />
                <Corner position="bottom-left" />
                <div className="top">
                    <BarChart
                        className={`DeltaBarChart ${hasSettled ? 'show' : 'hide'}`}
                        height={270}
                        xAxis={barX}
                        yAxis={barY}
                        series={barSeries}
                        grid={barGrid}
                        slots={slots}
                    />
                </div>
                <div className={`middle`}>
                    <GlyphLane />
                    <div
                        className={`sparkline-container ${isCommitActivityFetching ? '' : 'loaded'}`}
                    >
                        <SparkLineChart
                            data={sparklineData}
                            xAxis={sparklineX}
                            color="var(--secondary-color)"
                            height={20}
                            showTooltip
                            showHighlight
                        />
                    </div>
                    <GlyphLane />
                </div>
                <div className="bottom">
                    <div className=" commits-container">
                        <h3>Last 10 commits</h3>
                        <ul className="commits">
                            {isRecentCommitsFetching && (
                                <p>Loading commits...</p>
                            )}
                            {commits?.map((commit, index) => {
                                const l = new Date(commit.committedDate);

                                return (
                                    <li key={index} className="commit">
                                        <h4>{commit.message}</h4>
                                        <p>
                                            {commit.committedDate
                                                ? l.toLocaleString()
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
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="trailing-text">
                <p>Activity</p>
            </div>
        </li>
    );
};

export default ActivityCard;
