// React
import { ReactElement, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';
import { SparkLineChart } from '@mui/x-charts';

// Components
import Corner from '../../Corner/Corner';

// Custom
import { getRecentCommits } from '../../../http/getRecentCommits';
import extractErrorMessage from '../../../utils/extractErrorMessage';

// Types
import { CommitData, TaggedRepoData } from '../../../types';

// Styles
import './ActivityCard.css';

interface Props {
    projectData: TaggedRepoData;
}

const ActivityCard = ({ projectData }: Props): ReactElement => {
    const [commits, setCommits] = useState<CommitData[] | undefined>(undefined);
    const { data, isError, error } = useQuery({
        queryKey: ['commits', projectData.name],
        queryFn: () => getRecentCommits(projectData.name),
        staleTime: 240_000,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            setCommits(data);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            setCommits([]);

            console.error(extractErrorMessage(error));
        }
    }, [isError, error]);
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
