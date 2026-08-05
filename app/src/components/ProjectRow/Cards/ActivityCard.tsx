// React
import { ReactElement, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { getRecentCommits } from '../../../http/getRecentCommits';
import extractErrorMessage from '../../../utils/extractErrorMessage';

// Types
import { CommitData, TaggedRepoData } from '../../../types';

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
        <li className="project-card activity">
            <div>
                <article>
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
                                    target="_blank"
                                    rel="noreferrer"
                                    href={commit.url}
                                >
                                    View code diff on GitHub
                                </a>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
            <p>{projectData.name}</p>
        </li>
    );
};

export default ActivityCard;
