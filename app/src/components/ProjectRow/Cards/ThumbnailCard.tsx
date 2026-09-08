// React
import { ReactElement } from 'react';

// Components
import Corner from '../../Corner/Corner';
import Barcode from '../../Barcode/Barcode';
import GlyphLane from '../../GlyphLane/GlyphLane';

// Custom
import { TaggedRepoData } from '../../../types';
import getProjectContext from '../../../utils/getProjectContext';

// Styles
import './ThumbnailCard.css';
import { getImagesFromReadme } from '../../../modules/readme';

interface Props {
    projectData: TaggedRepoData;
    readme: string | undefined;
    isReadmeFetching: boolean;
}

const ThumbnailCard = ({
    projectData,
    readme,
    isReadmeFetching,
}: Props): ReactElement => {
    const readmeImages: string[] = getImagesFromReadme(
        readme,
        projectData.name
    );

    return (
        <li
            className={`project-card-container ${
                projectData.isFeatured ? 'featured' : 'not-featured'
            }`}
        >
            <div className="project-card ThumbnailCard">
                <Corner position="top-left" />
                <Corner position="bottom-right" />
                <Corner position="top-right" />
                <Corner position="bottom-left" />
                <div className="top">
                    <span className="project-context">
                        {getProjectContext(projectData)}
                    </span>
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
                        />
                        <div className="glitch__layers">
                            <div
                                className="glitch__layer"
                                style={{
                                    backgroundImage: `url('${projectData.image}')`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <GlyphLane />
                    <Barcode value={projectData.name} />
                    <p className="project-description">{projectData.desc}</p>
                    <GlyphLane />
                </div>
                <div className="bottom">
                    <h4 className="project-screenshots-title">Screenshots</h4>
                    <div className="project-screenshots-container">
                        <ul className="project-screenshots">
                            {!isReadmeFetching &&
                                readmeImages.slice(0, 4).map((src, index) => (
                                    <li key={index}>
                                        <img
                                            className="project-screenshot"
                                            src={src}
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
