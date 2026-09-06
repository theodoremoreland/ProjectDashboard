// React
import { SetStateAction, Dispatch } from 'react';

// Third party
import { useInView } from 'react-intersection-observer';

// Custom
import {
    useCommitActivity,
    useReadme,
    useRecentCommits,
    useSonarData,
    useTopLanguagesData,
} from './ProjectRow.hooks';

// Components
import Sidebar from './Sidebar/Sidebar';
import ThumbnailCard from './Cards/ThumbnailCard';
import MetricsCard from './Cards/MetricsCard';
import ActivityCard from './Cards/ActivityCard';
import Corner from '../Corner/Corner';
import DigitalRain from '../DigitalRain/DigitalRain';

// Types
import { TaggedRepoData } from '../../types';

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
    const { ref, inView } = useInView({
        threshold: 0.25,
    });

    const { topLanguagesData, isTopLanguagesFetching } = useTopLanguagesData(
        projectData.name,
        inView
    );
    const { readmeData, isReadmeFetching } = useReadme(
        projectData.name,
        inView
    );
    const { sonarMeasuresData, isSonarMeasuresFetching } = useSonarData(
        projectData.name,
        inView
    );
    const { commits, isRecentCommitsFetching } = useRecentCommits(
        projectData.name,
        inView
    );
    const { commitActivity, isCommitActivityFetching } = useCommitActivity(
        projectData.name,
        inView
    );

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
                        languages={topLanguagesData}
                        isTopLanguagesFetching={isTopLanguagesFetching}
                    />
                    <ul className="project-cards">
                        <ThumbnailCard
                            projectData={projectData}
                            readme={readmeData}
                            isReadmeFetching={isReadmeFetching}
                        />
                        <MetricsCard
                            projectData={projectData}
                            sonarMeasures={sonarMeasuresData}
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
                        <DigitalRain
                            topics={projectData.topics}
                            inView={inView}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectRow;
