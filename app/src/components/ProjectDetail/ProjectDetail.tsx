// React
import { ReactElement, useContext } from 'react';

// Custom
import useViewCount from '../../hooks/useViewCount';
import useExploredCount from '../../hooks/useExploredCount';
import useProjectViewTracker from '../../hooks/useProjectViewTracker';
import useIncrementExploredViewCount from '../../hooks/useIncrementExploredViewCount';
import getProjectContext from '../../utils/getProjectContext';
import { generateContextString } from './ProjectDetail.utils';
import { useReadmeImages } from './ProjectDetail.hooks';

// Components
import ImageCarousel from './ImageCarousel';

// Context
import { ViewCountContext } from '../../contexts/ViewCountContext/ViewCountContext';

// Types
import { TaggedRepoData } from '../../types';

// Custom styles
import './ProjectDetail.css';

interface Props {
    projectData: TaggedRepoData;
    handleClose: () => void;
}

const ProjectDetail = ({ projectData, handleClose }: Props): ReactElement => {
    useIncrementExploredViewCount({
        projectId: projectData.id,
    });

    const { images } = useReadmeImages(projectData.name);

    const { viewCounts, isError, isFetched, isFetching } =
        useContext(ViewCountContext);
    const viewCount: string | null = useViewCount(
        viewCounts,
        projectData.id,
        isError
    );
    const exploredCount: string | null = useExploredCount(
        viewCounts,
        projectData.id,
        isError
    );

    const handleLiveDemoClick = useProjectViewTracker(projectData, {
        isDemoView: true,
    });
    const handleGitHubClick = useProjectViewTracker(projectData, {
        isGitHubView: true,
    });

    const contextString = generateContextString(getProjectContext(projectData));

    return (
        <section id="ProjectDetail">
            <nav id="project-detail-nav">
                {/* Putting the onClick handler on the div because
                    the padding on the button wasn't triggering to onClick event.
                    This is a workaround to make the button padding clickable.
                */}
                <div onClick={handleClose}>
                    <button
                        type="button"
                        title="Close"
                        className="close-button"
                    >
                        Close
                    </button>
                </div>
            </nav>
            <div id="project-detail-content" className="row">
                <div id="image-container">
                    {images && images.length > 0 ? (
                        <ImageCarousel images={images} />
                    ) : (
                        <img src={projectData.image} alt={projectData.name} />
                    )}
                </div>
                <div id="info-container">
                    <h1>{projectData.name}</h1>
                    <div className="meta">
                        <div>
                            {isFetched && <span>{viewCount}</span>}
                            {isFetching && viewCount === null && (
                                <span className="loading">...</span>
                            )}
                        </div>
                        {isFetched && <span>•</span>}
                        <div>
                            {isFetched && <span>{exploredCount}</span>}
                            {isFetching && exploredCount === null && (
                                <span className="loading">...</span>
                            )}
                        </div>
                    </div>
                    <p>{projectData.desc}</p>
                    <p
                        className="context"
                        title="The context in which this project was created. Can be either Coursework / Exercise, Professional, or Personal."
                    >
                        {contextString}
                    </p>
                    <div className="button-container">
                        {projectData.demo_link &&
                            projectData.name !== 'ProjectDashboard' && (
                                <a
                                    href={projectData.demo_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={`Click to view a live demo of the ${projectData.name} project.`}
                                    onClick={
                                        handleLiveDemoClick.debouncedHandleClick
                                    }
                                    className="demo-link"
                                >
                                    <button type="button">
                                        View Live Demo
                                    </button>
                                </a>
                            )}
                        <a
                            href={projectData.url}
                            target="_blank"
                            rel="noreferrer"
                            title={`Click to view the source code for ${projectData.name}.`}
                            onClick={handleGitHubClick.debouncedHandleClick}
                            className="github-link"
                        >
                            <button type="button">View on GitHub</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
