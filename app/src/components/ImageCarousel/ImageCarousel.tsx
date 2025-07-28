// React
import { FC, ReactElement, useState } from 'react';

// Images
import ArrowUpwardIcon from '../../assets/images/icons/arrow_upward.svg?react';

// Styles
import './ImageCarousel.css';

interface Props {
    images: string[];
}

const ImageCarousel: FC<Props> = ({ images }: Props): ReactElement => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentImage: string = images[currentIndex];

    console.log('Current Image:', currentImage);

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="ImageCarousel">
            <button className="left" onClick={handleLeftClick}>
                <ArrowUpwardIcon className="icon" />
            </button>
            <img
                src={currentImage}
                alt={`Carousel image ${currentIndex + 1}`}
            />
            <button className="right" onClick={handleRightClick}>
                <ArrowUpwardIcon className="icon" />
            </button>
            <div className="circles">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`index ${currentIndex === index ? 'selected' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
