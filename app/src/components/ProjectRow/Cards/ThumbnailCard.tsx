// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

// Images
import alt from '../../../assets/images/under-construction-thumbnail.jpg';

// Styles
import './ThumbnailCard.css';
import Barcode from '../../Barcode/Barcode';

interface Props {
    projectData: TaggedRepoData;
}

const ThumbnailCard = ({ projectData }: Props): ReactElement => {
    return (
        <li
            className={`project-card-container ${
                projectData.isFeatured ? 'featured' : 'not-featured'
            }`}
        >
            <div className="project-card ThumbnailCard">
                <div className="top-half">
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
                        <Barcode value={projectData.name} />
                        <p className="project-description">
                            {projectData.desc}
                        </p>
                    </div>
                </div>
                <div className="bottom-half">
                    <h4 className="project-screenshots-title">Screenshots</h4>
                    <div className="project-screenshots-container">
                        <ul className="project-screenshots">
                            {[1, 2, 3, 4].map((_, index) => (
                                <li key={index}>
                                    <img
                                        className="project-screenshot interactive"
                                        src={projectData.image}
                                        alt={`${projectData.name} screenshot ${index + 1}`}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="trailing-text">
                <p>Thumbnail</p>
                <p>{projectData.id}</p>
            </div>
        </li>
    );
};

export default ThumbnailCard;
