// React
import { ReactElement, useContext, useMemo } from 'react';

// Custom
import useProjectViewTracker from '../../hooks/useProjectViewTracker';
import getProjectContext from '../../utils/getProjectContext';

// Context
import { ViewCountContext } from '../../contexts/ViewCountContext/ViewCountContext';

// Types
import { TaggedRepoData } from '../../types';

// Images
import DeployedCodeIcon from '../../images/icons/deployed-code.svg?react';
import CodeIcon from '../../images/icons/code.svg?react';
import StarIcon from '../../images/icons/star.svg?react';
import EventIcon from '../../images/icons/event.svg?react';
import EventRepeatIcon from '../../images/icons/event_repeat.svg?react';
import LandscapeIcon from '../../images/icons/landscape.svg?react';
import VisibilityIcon from '../../images/icons/visibility.svg?react';

// Custom styles
import './ProjectDetail.css';

interface Props {
    projectData: TaggedRepoData;
    handleClose: () => void;
}

const ProjectDetail = ({ projectData, handleClose }: Props): ReactElement => {
    const { viewCounts } = useContext(ViewCountContext);

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
    const handleGitHubClick = useProjectViewTracker(projectData, viewCount, {
        isGitHubView: true,
    });

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
                    <img src={projectData.image} alt={projectData.name} />
                </div>
                <div id="info-container">
                    <h1>{projectData.name}</h1>
                    <p>
                        {projectData.name === 'ProjectList'
                            ? `${projectData.desc} You are currently viewing this project!`
                            : projectData.desc}
                    </p>
                    <table id="metadata">
                        <tbody>
                            <tr title="The context in which this project was created. Can be either Coursework / Exercise, Professional, or Personal.">
                                <td>
                                    <div>
                                        <LandscapeIcon className="landscape icon" />
                                        <span>Context</span>
                                    </div>
                                </td>
                                <td>
                                    <div>{getProjectContext(projectData)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <EventIcon className="event icon" />
                                        <span>Created</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {new Date(
                                            projectData.date_created
                                        ).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <EventRepeatIcon className="event-repeat icon" />
                                        <span>Last modified</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {new Date(
                                            projectData.date_updated
                                        ).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <StarIcon className="star icon" />
                                        <span>Stars</span>
                                    </div>
                                </td>
                                <td>
                                    <div>{projectData.stars}</div>
                                </td>
                            </tr>
                            {viewCount !== null && (
                                <tr>
                                    <td>
                                        <div>
                                            <VisibilityIcon className="visibility icon" />
                                            <span>Views</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{viewCount}</div>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>
                                    <div>
                                        <CodeIcon className="code icon" />
                                        <span>Source code</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <a
                                            href={projectData.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={`Click to view the source code for ${projectData.name}.`}
                                            onClick={
                                                handleGitHubClick.debouncedHandleClick
                                            }
                                            className="github-link"
                                        >
                                            View on GitHub
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            {projectData.name !== 'ProjectList' && (
                                <tr>
                                    <td>
                                        <div>
                                            <DeployedCodeIcon className="deployment icon" />
                                            <span>Deployment</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {projectData.demo_link ? (
                                                <a
                                                    href={projectData.demo_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title={`Click to view a live demo of the ${projectData.name} project.`}
                                                    className="deployment-link"
                                                    onClick={
                                                        handleLiveDemoClick.debouncedHandleClick
                                                    }
                                                >
                                                    View Live Demo{' '}
                                                    <span className="circle"></span>
                                                </a>
                                            ) : (
                                                'None'
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ul
                        id="topics"
                        title="GitHub topic associated with this project."
                    >
                        {projectData.topics.map((topic) => (
                            <li key={topic} className="topic">
                                {topic}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
