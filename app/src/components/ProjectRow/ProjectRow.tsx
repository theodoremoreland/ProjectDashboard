// React
import { SetStateAction, Dispatch, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// Custom
// Custom
import { getRecentCommits } from '../../http/getRecentCommits';
import extractErrorMessage from '../../utils/extractErrorMessage';

// Components
import Sidebar from './Sidebar/Sidebar';
import ThumbnailCard from './Cards/ThumbnailCard';
import MetricsCard from './Cards/MetricsCard';
import ActivityCard from './Cards/ActivityCard';
import Corner from '../Corner/Corner';

// Types
import { TaggedRepoData, CommitData } from '../../types';

// Custom styles
import './ProjectRow.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const ProjectRow = ({ projectData, setSelectedProject }: Props) => {
    const [commits, setCommits] = useState<CommitData[] | undefined>(undefined);

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });
    const { data, isError, isFetching, error } = useQuery({
        enabled: inView,
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
        <article
            id={`${projectData.name}`}
            className="project-row"
            ref={ref}
            onMouseEnter={() => setSelectedProject(projectData)}
        >
            <div className="project-row-content">
                <div className="project-row-header">
                    <h2 className="project-name">
                        <Corner position="top-left" />
                        <Corner position="top-right" />
                        {projectData.name}
                        <Corner position="bottom-left" />
                        <Corner position="bottom-right" />
                    </h2>
                    <div className="meta">
                        <p className="project-date">
                            C:{' '}
                            {new Date(projectData.date_created).toISOString()}
                        </p>
                        <p className="project-date">
                            U:{' '}
                            {new Date(projectData.date_updated).toISOString()}
                        </p>
                    </div>
                </div>
                <div className="project-row-main">
                    <Sidebar />
                    <ul className="project-cards">
                        <ThumbnailCard projectData={projectData} />
                        <MetricsCard projectData={projectData} />
                        <ActivityCard
                            isFetching={isFetching}
                            projectData={projectData}
                            commits={commits}
                        />
                    </ul>
                </div>
                <div className="project-row-footer">
                    <div className="project-video-preview">
                        <h3>Project Preview</h3>
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/source/d20511205038723.66b3a6fe1a294.gif"
                            alt="Project preview"
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectRow;
