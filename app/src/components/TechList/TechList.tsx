import {
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

// Controller
import {
    findKeyForTopicLabel,
    findTopicLabelImageSrc,
    getTopicCounts,
    determineClassName,
} from './TechList.controller';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext';

// Types
import { TopicCounts } from '../../types';

// Images
import CheckIcon from '../../images/icons/check.svg?react';

// Styles
import './TechList.css';

const TechList = (): ReactElement => {
    const { repos, updateFeaturedTopics, featuredTopics } =
        useContext(ProjectsContext);
    const [topicsCount, setTopicsCount] = useState<TopicCounts | null>(null);

    const generateListItems = useCallback(
        (topics: { [key: string]: number }) => {
            return Object.entries(topics)
                .sort(
                    ([, topicCount1], [, topicCount2]) =>
                        topicCount2 - topicCount1
                )
                .map(([topicLabel, topicCount]) => {
                    const className: '' | 'selected' | 'filtered-out' =
                        determineClassName(topicLabel, featuredTopics);

                    return (
                        <li
                            key={topicLabel}
                            title={
                                className !== 'selected'
                                    ? `Click to filter projects by ${topicLabel}.`
                                    : `Click to remove ${topicLabel} filter.`
                            }
                            className={className}
                            onClick={() =>
                                updateFeaturedTopics(
                                    findKeyForTopicLabel(topicLabel)
                                )
                            }
                        >
                            <label
                                htmlFor={`${topicLabel}-checkbox`}
                                className="checkbox-label"
                            >
                                {className === 'selected' && (
                                    <CheckIcon className="checkbox-icon" />
                                )}
                                <input
                                    id={`${topicLabel}-checkbox`}
                                    aria-label={`Filter projects by ${topicLabel}`}
                                    name={`${topicLabel}-checkbox`}
                                    type="checkbox"
                                    className="checkbox"
                                    checked={
                                        className === 'selected' ? true : false
                                    }
                                    readOnly
                                />
                            </label>
                            <div className="topic-label-container">
                                {topicLabel}
                                {findTopicLabelImageSrc(topicLabel) && (
                                    <img
                                        src={findTopicLabelImageSrc(topicLabel)}
                                        alt={topicLabel}
                                        className="tech-icon"
                                    />
                                )}
                            </div>
                            <span className="count">{topicCount}</span>
                        </li>
                    );
                });
        },
        [updateFeaturedTopics, featuredTopics]
    );

    useEffect(() => {
        if (repos) {
            setTopicsCount(getTopicCounts(repos));
        }
    }, [repos]);

    return (
        <ul id="tech-list">
            <h2>Filter projects</h2>
            <p className="tech-category">Competencies</p>
            {topicsCount && generateListItems(topicsCount.competencies)}
            <p className="tech-category">Languages</p>
            {topicsCount && generateListItems(topicsCount.languages)}
            <p className="tech-category">Frameworks</p>
            {topicsCount && generateListItems(topicsCount.frameworks)}
            <p className="tech-category">Tools</p>
            {topicsCount && generateListItems(topicsCount.tools)}
        </ul>
    );
};

export default TechList;
