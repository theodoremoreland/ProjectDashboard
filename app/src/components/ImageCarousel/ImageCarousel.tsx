// React
import {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

// Images
import ArrowUpwardIcon from '../../assets/images/icons/arrow_upward.svg?react';

// Styles
import './ImageCarousel.css';

interface Props {
    images: string[];
}

const AUTO_PLAY_INTERVAL_TIME: number = 4_000;

const ImageCarousel: FC<Props> = ({ images }: Props): ReactElement => {
    const selfRef = useRef<HTMLDivElement>(null);
    const shouldAutoPlay = useRef(true);
    const shouldResumeAutoPlayOnMouseLeave = useRef(true);
    const setAutoPlayIntervalId = useRef<number | undefined>(undefined);

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentImage: string = images[currentIndex];

    const handleLeftClick = () => {
        // Once the user clicks the left or right button, stop auto-playing completely.
        shouldResumeAutoPlayOnMouseLeave.current = false;
        shouldAutoPlay.current = false;

        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleRightClick = () => {
        // Once the user clicks the left or right button, stop auto-playing completely.
        shouldResumeAutoPlayOnMouseLeave.current = false;
        shouldAutoPlay.current = false;

        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleMouseEnter = useCallback(() => {
        shouldAutoPlay.current = false;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (shouldResumeAutoPlayOnMouseLeave.current) {
            shouldAutoPlay.current = true;
        }
    }, []);

    useEffect(() => {
        const _selfRef = selfRef.current;

        if (images.length < 2) return;

        if (shouldAutoPlay.current) {
            window.clearInterval(setAutoPlayIntervalId.current); // Always clear before setting

            _selfRef?.addEventListener('mouseenter', handleMouseEnter);
            _selfRef?.addEventListener('mouseleave', handleMouseLeave);

            setAutoPlayIntervalId.current = window.setInterval(() => {
                if (shouldAutoPlay.current) {
                    setCurrentIndex((prevIndex) =>
                        prevIndex === images.length - 1 ? 0 : prevIndex + 1
                    );
                } else if (shouldResumeAutoPlayOnMouseLeave.current === false) {
                    window.clearInterval(setAutoPlayIntervalId.current);
                }
            }, AUTO_PLAY_INTERVAL_TIME);
        }

        return () => {
            window.clearInterval(setAutoPlayIntervalId.current);
            _selfRef?.removeEventListener('mouseenter', handleMouseEnter);
            _selfRef?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [images, handleMouseEnter, handleMouseLeave]);

    return (
        <div className="ImageCarousel" ref={selfRef}>
            <button className="left" onClick={handleLeftClick}>
                <ArrowUpwardIcon className="icon" />
            </button>
            <img
                src={currentImage}
                alt={`Carousel image ${currentIndex + 1}`}
                onLoad={(e) => {
                    const target: EventTarget = e.target;

                    if (target instanceof HTMLImageElement) {
                        target.classList.add('loaded');
                    }
                }}
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
