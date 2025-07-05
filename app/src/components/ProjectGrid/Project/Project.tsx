// React
import { ReactElement, SetStateAction, Dispatch } from 'react';

// Third party
import { useInView } from 'react-intersection-observer';

// Custom
import getProjectContext from '../../../utils/getProjectContext';
import { DevsChoiceProjectNames } from '../../../constants/FeaturedProjects';

// Components
import DevsChoiceBadge from '../../DevsChoiceBadge/DevsChoiceBadge';

// Types
import { TaggedRepoData } from '../../../types';

// Images
import alt from '../../../images/under-construction-thumbnail.jpg';
import htmlIcon from '../../../images/languages/html.png';
import javascriptIcon from '../../../images/languages/javascript.png';
import typescriptIcon from '../../../images/languages/typescript.png';
import pythonIcon from '../../../images/languages/python.png';
import javaIcon from '../../../images/languages/java.png';
import vbaIcon from '../../../images/languages/vba.png';
import sqlIcon from '../../../images/languages/sql.png';

// Custom styles
import './Project.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const renderLanguageIcon = (topic: string): ReactElement | null => {
    const titleTemplate = 'This project was written with ';

    switch (topic) {
        case 'html':
            return (
                <li key={topic} title={titleTemplate + 'HTML'}>
                    <img src={htmlIcon} alt="HTML" className="language-icon" />
                </li>
            );
        case 'javascript':
            return (
                <li key={topic} title={titleTemplate + 'JavaScript'}>
                    <img
                        src={javascriptIcon}
                        alt="JavaScript"
                        className="language-icon"
                    />
                </li>
            );
        case 'typescript':
            return (
                <li key={topic} title={titleTemplate + 'TypeScript'}>
                    <img
                        src={typescriptIcon}
                        alt="TypeScript"
                        className="language-icon"
                    />
                </li>
            );
        case 'python':
            return (
                <li key={topic} title={titleTemplate + 'Python'}>
                    <img
                        src={pythonIcon}
                        alt="Python"
                        className="language-icon"
                    />
                </li>
            );
        case 'java':
            return (
                <li key={topic} title={titleTemplate + 'Java'}>
                    <img src={javaIcon} alt="Java" className="language-icon" />
                </li>
            );
        case 'vba':
            return (
                <li key={topic} title={titleTemplate + 'VBA'}>
                    <img src={vbaIcon} alt="VBA" className="language-icon" />
                </li>
            );
        case 'sql':
            return (
                <li key={topic} title={titleTemplate + 'SQL'}>
                    <img src={sqlIcon} alt="SQL" className="language-icon" />
                </li>
            );
        default:
            return null;
    }
};

const Project = ({ projectData, setSelectedProject }: Props) => {
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
                    <span className="view-count">23k views</span>
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
