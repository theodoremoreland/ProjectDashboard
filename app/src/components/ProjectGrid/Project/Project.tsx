// React
import { SetStateAction, Dispatch } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

// Images
import alt from '../../../assets/images/under-construction-thumbnail.jpg';

// Custom styles
import './Project.css';

interface Props {
    projectData: TaggedRepoData;
    setSelectedProject: Dispatch<SetStateAction<TaggedRepoData | null>>;
}

const Project = ({ projectData }: Props) => {
    return (
        <div
            className={`project-card ${
                projectData.isFeatured ? 'featured' : 'not-featured'
            }`}
        >
            <h2>{projectData.name}</h2>
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
                <p className="project-description">{projectData.desc}</p>
            </div>
            <ul className="project-screenshots">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <li key={index}>
                        <img
                            className="project-screenshot"
                            src={projectData.image}
                            alt={`${projectData.name} screenshot ${index + 1}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Project;
