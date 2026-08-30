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

const ActivityCard = ({
    projectData,
    commits,
    commitActivity,
    isRecentCommitsFetching,
    isCommitActivityFetching,
}: Props): ReactElement => {
    return (
        <li className="project-card-container">
            <div className="project-card ActivityCard">
                <Corner position="top-left" />
                <article>
                    {isCommitActivityFetching && commitActivity ? (
                        <p>Loading commit activity...</p>
                    ) : (
                        <SparkLineChart
                            data={
                                commitActivity?.map((week) => week.total) || []
                            }
                            colors={['#c0fe04']}
                            height={20}
                        />
                    )}
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
                </article>
            </div>
            <div className="trailing-text">
                <p>Activity</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default ActivityCard;
