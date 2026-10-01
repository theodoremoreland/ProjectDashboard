// React
import { ReactElement } from 'react';

// Components
import DigitalRain from '../DigitalRain/DigitalRain';

// Styles
import './TopicsFullscreen.css';

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    projectName: string;
    topics: string[];
}

const TopicsFullscreen = ({
    show,
    setShow,
    projectName,
    topics,
}: Props): ReactElement => {
    return (
        <div className={`TopicsFullscreen ${show ? 'show' : 'hide'}`}>
            <div className="layer">
                <div className="content">
                    <button
                        type="button"
                        title="Close"
                        className="close-button"
                        onClick={() => setShow(false)}
                    >
                        Close
                    </button>
                    <div className="banner">
                        <h2 className="title">{projectName}</h2>
                        <p className="subtitle">
                            {topics.length} GitHub topics
                        </p>
                        <ul>
                            {topics.map((topic, index) => (
                                <li
                                    key={topic}
                                    style={
                                        { '--i': index } as React.CSSProperties
                                    }
                                >
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <DigitalRain
                shouldAnimate={show}
                garganta={false}
                topics={topics}
            />
        </div>
    );
};

export default TopicsFullscreen;
