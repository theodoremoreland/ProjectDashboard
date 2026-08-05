// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

// Images
import alt from '../../../assets/images/under-construction-thumbnail.jpg';

// Styles
import './ThumbnailCard.css';

interface Props {
    projectData: TaggedRepoData;
}

const ThumbnailCard = ({ projectData }: Props): ReactElement => {
    return (
        <li
            className={`project-card ThumbnailCard ${
                projectData.isFeatured ? 'featured' : 'not-featured'
            }`}
        >
            <h2 className="project-name">{projectData.name}</h2>
            <div className="project-image-container">
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
            </div>
            <div className="project-about">
                <p className="project-description">{projectData.desc}</p>
            </div>
            <h4 className="project-screenshots-title">Screenshots</h4>
            <div className="project-screenshots-container">
                <ul className="project-screenshots">
                    {[1, 2, 3, 4].map((_, index) => (
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
        </li>
    );
};

export default ThumbnailCard;
