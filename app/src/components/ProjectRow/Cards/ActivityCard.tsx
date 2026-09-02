// React
import { ReactElement } from 'react';

// Third party
import { SparkLineChart } from '@mui/x-charts';

// Components
import Corner from '../../Corner/Corner';

// Types
import {
    CommitActivityData,
    RecentCommitsData,
    TaggedRepoData,
} from '../../../types';

// Styles
import './ActivityCard.css';

interface Props {
    projectData: TaggedRepoData;
    commits: RecentCommitsData | undefined;
    commitActivity: CommitActivityData | undefined;
    isRecentCommitsFetching?: boolean;
    isCommitActivityFetching?: boolean;
}

const getCommitsPerWeek = (
    commitActivity: CommitActivityData | undefined
): number[] => {
    if (!commitActivity) {
        return [];
    }

    const allWeeks = commitActivity.flatMap((contributor) => contributor.weeks);
    const commitsPerWeek: { [weekStart: number]: number } = {};

    allWeeks.forEach((week) => {
        if (!week.w || !week.c) {
            return;
        }

        commitsPerWeek[week.w] = (commitsPerWeek[week.w] || 0) + week.c;
    });

    return Object.values(commitsPerWeek);
};

const ActivityCard = ({
    projectData,
    commits,
    commitActivity,
    isRecentCommitsFetching,
}: Props): ReactElement => {
    const commitsPerWeek = getCommitsPerWeek(commitActivity);

    return (
        <li className="project-card-container">
            <div className="project-card ActivityCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
                <div className="top"></div>
                <div className="middle sparkline-container">
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
                                <h4>{commit.commit.message}</h4>
                                <p>
                                    {commit.commit.committer?.date
                                        ? new Date(
                                              commit.commit.committer.date
                                          ).toLocaleString()
                                        : 'Unknown date'}
                                </p>
                                <a
                                    className="interactive"
                                    target="_blank"
                                    rel="noreferrer"
                                    href={commit.html_url}
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
