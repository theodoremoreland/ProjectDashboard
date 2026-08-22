// React
import { ReactElement } from 'react';

// Third party
import { SparkLineChart } from '@mui/x-charts';

// Components
import Corner from '../../Corner/Corner';

// Types
import { CommitData, TaggedRepoData } from '../../../types';

// Styles
import './ActivityCard.css';

interface Props {
    projectData: TaggedRepoData;
    commits: CommitData[] | undefined;
    isFetching?: boolean;
}

const ActivityCard = ({
    projectData,
    commits,
    isFetching,
}: Props): ReactElement => {
    return (
        <li className="project-card-container">
            <div className="project-card ActivityCard">
                <Corner position="top-left" />
                <article>
                    <SparkLineChart
                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                        colors={['#c0fe04']}
                        height={20}
                    />
                    <h3>Recent commits</h3>
                    <ul className="commits">
                        {isFetching && <p>Loading commits...</p>}
                        {commits?.map((commit, index) => (
                            <li key={index} className="commit">
                                <h4>{commit.commit.message}</h4>
                                <p>
                                    {new Date(
                                        commit.commit.committer.date
                                    ).toLocaleString()}{' '}
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
