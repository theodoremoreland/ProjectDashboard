// React
import { ReactElement } from 'react';

// Components
import DigitalRain from '../DigitalRain/DigitalRain';

// Styles
import './Topics.css';

interface Props {
    projectName: string;
    topics: string[];
}

const Topics = ({ projectName, topics }: Props): ReactElement => {
    return (
        <div className="Topics">
            <div className="banner">
                <h2 className="title">{projectName}</h2>
                <p className="subtitle">{topics.length} GitHub topics</p>
                <ul>
                    {topics.map((topic) => (
                        <li>{topic}</li>
                    ))}
                </ul>
            </div>
            <DigitalRain shouldAnimate garganta={false} topics={topics} />
        </div>
    );
};

export default Topics;
