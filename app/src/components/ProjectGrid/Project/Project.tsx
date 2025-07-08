// React
import { SetStateAction, Dispatch, useContext, useMemo } from 'react';

// Third party
import { useInView } from 'react-intersection-observer';

// Custom
import getProjectContext from '../../../utils/getProjectContext';
import { DevsChoiceProjectNames } from '../../../constants/FeaturedProjects';
import { renderLanguageIcon } from './Project.controller';
import useProjectViewTracker from '../../../hooks/useProjectViewTracker';

// Context
import { ViewCountContext } from '../../../contexts/ViewCountContext/ViewCountContext';

// Components
import DevsChoiceBadge from '../../DevsChoiceBadge/DevsChoiceBadge';

// Types
import { TaggedRepoData } from '../../../types';

// Images
import alt from '../../../images/under-construction-thumbnail.jpg';

// Custom styles
import './Project.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const Project = ({ projectData, setSelectedProject }: Props) => {
    const { viewCounts, isError, isFetched } = useContext(ViewCountContext);
    const viewCount: number | null = useMemo(() => {
        if (viewCounts && viewCounts[projectData.id]) {
            return (
                viewCounts[projectData.id].github_views +
                viewCounts[projectData.id].demo_views
            );
        }

        return null;
    }, [viewCounts, projectData.id]);
    const handleLiveDemoClick = useProjectViewTracker(projectData, viewCount, {
        isDemoView: true,
    });
    const { ref, inView } = useInView({
        threshold: 0,
    });

    return (
        <div
            ref={ref}
            className={`project-card ${
                projectData.isFeatured ? 'featured' : 'not-featured'
            }`}
        >
            {DevsChoiceProjectNames.includes(projectData.name) && (
                <DevsChoiceBadge />
            )}
            <img
                className="project-image"
                onLoad={(e) => {
                    const target: EventTarget = e.target;

                    if (target instanceof HTMLImageElement) {
                        target.classList.add('loaded');
                    }
                }}
                src={projectData.image}
                alt={projectData.name}
                onError={(e) => {
                    const target: EventTarget = e.target;

                    if (target instanceof HTMLImageElement) {
                        if (target.src !== alt) {
                            target.src = alt;
                        }
                    }
                }}
            />
            <div className="project-about">
                <div className="row">
                    <span className="project-pill">
                        {getProjectContext(projectData)}
                    </span>
                    {isFetched && !isError ? (
                        <span className="view-count">
                            {viewCount ?? 0} views
                        </span>
                    ) : (
                        <span className="view-count loading">
                            Loading views...
                        </span>
                    )}
                </div>
                <p className="project-description">{projectData.desc}</p>
            </div>
            {inView && (
                <div className="project-overlay">
                    <div id="content">
                        <div className="row">
                            <h2 className="project-name">{projectData.name}</h2>
                        </div>
                        <div className="row">
                            <ul>
                                {projectData.demo_link &&
                                    projectData.name !== 'ProjectList' && (
                                        // <a> tag needs to wrap the <li> tag to make the entire list item clickable.
                                        <a
                                            href={projectData.demo_link}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={`Click to view a live demo of the ${projectData.name} project.`}
                                            className="live-demo-link"
                                            onClick={
                                                handleLiveDemoClick.debouncedTrackDemoClick
                                            }
                                        >
                                            <button className="live-demo">
                                                Live Demo{' '}
                                                <span className="circle"></span>
                                            </button>
                                        </a>
                                    )}
                                {/* Putting the onClick handler on the li because
                    the padding on the button wasn't triggering to onClick event.
                    This is a workaround to make the button padding clickable.
                */}
                                <li
                                    onClick={() =>
                                        setSelectedProject(projectData)
                                    }
                                    role="presentation"
                                    className="learn-more"
                                    title={`Click to learn more about the ${projectData.name} project.`}
                                >
                                    <button
                                        type="button"
                                        className="learn-more-button"
                                    >
                                        Learn More
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <ul className="language-icons">
                                {projectData.topics.map((topic) =>
                                    renderLanguageIcon(topic)
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;
