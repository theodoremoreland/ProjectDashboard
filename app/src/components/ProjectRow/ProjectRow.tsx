// React
import { SetStateAction, Dispatch, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// Custom
import { getRecentCommits } from '../../http/getRecentCommits';
import { getCommitActivity } from '../../http/getCommitActivity';
import { getTopLanguages } from '../../http/getTopLanguages';
import { getSonarMeasures } from '../../http/getSonarMeasures';
import extractErrorMessage from '../../utils/extractErrorMessage';

// Components
import Sidebar from './Sidebar/Sidebar';
import ThumbnailCard from './Cards/ThumbnailCard';
import MetricsCard from './Cards/MetricsCard';
import ActivityCard from './Cards/ActivityCard';
import Corner from '../Corner/Corner';
import Garganta from '../Garganta/Garganta';

// Types
import {
    TaggedRepoData,
    SonarMeasures,
    CommitActivityData,
    RecentCommitsData,
    TopLanguagesData,
} from '../../types';

// Icons
import ForkRightIcon from '../../assets/images/icons/fork_right.svg?react';
import HotelClassIcon from '../../assets/images/icons/hotel_class.svg?react';
import WeightIcon from '../../assets/images/icons/weight.svg?react';

// Styles
import './ProjectRow.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const ProjectRow = ({ projectData, setSelectedProject }: Props) => {
    const [commits, setCommits] = useState<RecentCommitsData | undefined>(
        undefined
    );
    const [commitActivity, setCommitActivity] = useState<
        CommitActivityData | undefined
    >(undefined);
    const [topLanguages, setTopLanguages] = useState<
        TopLanguagesData | undefined
    >(undefined);
    const [sonarMeasures, setSonarMeasures] = useState<
        SonarMeasures | undefined
    >(undefined);

    const { ref, inView } = useInView({
        threshold: 0.25,
    });
    const {
        data: recentCommitsData,
        isError: isRecentCommitsError,
        isFetching: isRecentCommitsFetching,
        error: recentCommitsError,
    } = useQuery({
        enabled: inView,
        queryKey: ['commits', projectData.name],
        queryFn: () => getRecentCommits(projectData.name),
        staleTime: Infinity,
        retry: false,
    });
    const {
        data: commitActivityData,
        isError: isCommitActivityError,
        isFetching: isCommitActivityFetching,
        error: commitActivityError,
    } = useQuery({
        enabled: inView,
        queryKey: ['commitActivity', projectData.name],
        queryFn: () => getCommitActivity(projectData.name),
        staleTime: Infinity,
        retry: 4,
        retryDelay: 1500,
    });
    const {
        data: topLanguagesData,
        isFetching: isTopLanguagesFetching,
        isError: isTopLanguagesError,
        error: topLanguagesError,
    } = useQuery({
        enabled: inView,
        queryKey: ['topLanguages', projectData.name],
        queryFn: () => getTopLanguages(projectData.name),
        staleTime: Infinity,
        retry: false,
    });
    const {
        data: sonarMeasuresData,
        error: sonarMeasuresError,
        isError: isSonarMeasuresError,
        isFetching: isSonarMeasuresFetching,
    } = useQuery({
        enabled: inView,
        queryKey: ['sonarMeasures', projectData.name],
        queryFn: () => getSonarMeasures(projectData.name),
        staleTime: Infinity,
        retry: false,
    });

    // ---- Recent commits ---

    useEffect(() => {
        if (recentCommitsData) {
            setCommits(recentCommitsData);
        }
    }, [recentCommitsData]);

    useEffect(() => {
        if (isRecentCommitsError) {
            setCommits([]);

            console.error(extractErrorMessage(recentCommitsError));
        }
    }, [isRecentCommitsError, recentCommitsError]);

    // ---- Commit activity ---

    useEffect(() => {
        if (commitActivityData) {
            setCommitActivity(commitActivityData);
        }
    }, [commitActivityData]);

    useEffect(() => {
        if (isCommitActivityError) {
            setCommitActivity([]);
        }
    }, [isCommitActivityError, commitActivityError]);

    // ---- Top languages ---

    useEffect(() => {
        if (topLanguagesData) {
            setTopLanguages(topLanguagesData);
        }
    }, [topLanguagesData]);

    useEffect(() => {
        if (isTopLanguagesError) {
            console.error(extractErrorMessage(topLanguagesError));
        }
    }, [isTopLanguagesError, topLanguagesError]);

    // ---- Sonar measures ---

    useEffect(() => {
        if (sonarMeasuresData) {
            setSonarMeasures(sonarMeasuresData);
        }
    }, [sonarMeasuresData]);

    useEffect(() => {
        if (isSonarMeasuresError) {
            console.error('Failed to fetch Sonar measures');
        }
    }, [isSonarMeasuresError, sonarMeasuresError]);

    return (
        <article
            id={`${projectData.name}`}
            className="ProjectRow"
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
                    <div className="project-counts">
                        <span className="plus">+</span>
                        <span title="Project size in bytes">
                            <WeightIcon className="weight icon" />
                            {projectData.size}
                        </span>
                        <span className="plus">+</span>
                        <span title="Number of stars">
                            <HotelClassIcon className="query_stats icon" />
                            {projectData.stars}
                        </span>
                        <span className="plus">+</span>
                        <span title="Number of forks">
                            <ForkRightIcon className="fork_right icon" />
                            {projectData.forks_count}
                        </span>
                        <span className="plus">+</span>
                    </div>
                    <div className="meta">
                        <p className="project-date-label">
                            <span>Created</span> x <span>Updated</span>
                        </p>
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
                    <Sidebar
                        languages={topLanguages}
                        isTopLanguagesFetching={isTopLanguagesFetching}
                    />
                    <ul className="project-cards">
                        <ThumbnailCard projectData={projectData} />
                        <MetricsCard
                            projectData={projectData}
                            sonarMeasures={sonarMeasures}
                            isSonarMeasuresFetching={isSonarMeasuresFetching}
                        />
                        <ActivityCard
                            isRecentCommitsFetching={isRecentCommitsFetching}
                            isCommitActivityFetching={isCommitActivityFetching}
                            projectData={projectData}
                            commits={commits}
                            commitActivity={commitActivity}
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
                    <div className="topics-container">
                        <p className="topics-label">
                            <span>T</span>
                            <span>O</span>
                            <span>P</span>
                            <span>I</span>
                            <span>C</span>
                            <span>S</span>
                        </p>
                        <p className="topics-label__layer2">
                            <span>T</span>
                            <span>O</span>
                            <span>P</span>
                            <span>I</span>
                            <span>C</span>
                            <span>S</span>
                        </p>
                        <Garganta />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectRow;
