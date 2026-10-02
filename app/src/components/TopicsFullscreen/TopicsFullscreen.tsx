// React
import { ReactElement, useContext, useMemo } from 'react';

// Custom
import { properCase } from '../../utils/properCase';
import getPairwiseJaccard from '../../utils/getPairwiseJaccard';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext';

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
    const { allUniqueTopics } = useContext(ProjectsContext);

    const casedTopics: string[] = useMemo(() => properCase(topics), [topics]);
    const jaccardSimilarity: string = useMemo(
        () => getPairwiseJaccard(allUniqueTopics, topics),
        [allUniqueTopics, topics]
    );

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
                            {casedTopics.length} GitHub topics
                        </p>
                        <p className="subtitle">
                            {`Jaccard similarity: ${jaccardSimilarity}`}
                        </p>
                        <ul>
                            {casedTopics.map((topic, index) => (
                                <li
                                    key={topics[index]}
                                    style={
                                        { '--i': index } as React.CSSProperties
                                    }
                                >
                                    <a
                                        id={`topic-link-${topics[index]}`}
                                        href={`https://github.com/topics/${topics[index]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {topic}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <DigitalRain
                shouldAnimate={show}
                garganta={false}
                topics={casedTopics}
                shouldProperCase={false}
            />
        </div>
    );
};

export default TopicsFullscreen;
