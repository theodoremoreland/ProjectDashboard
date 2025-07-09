// React
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
import KeyboardControlKey from '../../images/icons/keyboard_control_key.svg?react';
import CheckIcon from '../../images/icons/check.svg?react';

// Styles
import './TechList.css';

const TechList = (): ReactElement => {
    const { repos, updateFeaturedTopics, featuredTopics } =
        useContext(ProjectsContext);
    const [topicsCount, setTopicsCount] = useState<TopicCounts | null>(null);
    const [areCompetenciesVisible, setAreCompetenciesVisible] =
        useState<boolean>(true);
    const [areLanguagesVisible, setAreLanguagesVisible] =
        useState<boolean>(true);
    const [areFrameworksVisible, setAreFrameworksVisible] =
        useState<boolean>(true);
    const [areToolsVisible, setAreToolsVisible] = useState<boolean>(true);

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
            <h2 className="header">Filter projects</h2>
            <div
                className={`tech-category-container ${areCompetenciesVisible ? '' : 'rotated'}`}
            >
                <p className="tech-category">Competencies</p>
                <button
                    className="toggle-visibility-button"
                    onClick={() => setAreCompetenciesVisible((prev) => !prev)}
                    title="Toggle competencies visibility"
                    aria-label={
                        areCompetenciesVisible
                            ? 'Hide competencies'
                            : 'Show competencies'
                    }
                >
                    <KeyboardControlKey
                        className={`toggle-icon ${areCompetenciesVisible ? '' : 'rotated'}`}
                    />
                </button>
            </div>
            {topicsCount &&
                areCompetenciesVisible &&
                generateListItems(topicsCount.competencies)}
            <div
                className={`tech-category-container ${areLanguagesVisible ? '' : 'rotated'}`}
            >
                <p className="tech-category">Languages</p>
                <button
                    className="toggle-visibility-button"
                    onClick={() => setAreLanguagesVisible((prev) => !prev)}
                    title="Toggle languages visibility"
                    aria-label={
                        areLanguagesVisible
                            ? 'Hide languages'
                            : 'Show languages'
                    }
                >
                    <KeyboardControlKey
                        className={`toggle-icon ${areLanguagesVisible ? '' : 'rotated'}`}
                    />
                </button>
            </div>
            {topicsCount &&
                areLanguagesVisible &&
                generateListItems(topicsCount.languages)}
            <div
                className={`tech-category-container ${areFrameworksVisible ? '' : 'rotated'}`}
            >
                <p className="tech-category">Frameworks</p>
                <button
                    className="toggle-visibility-button"
                    onClick={() => setAreFrameworksVisible((prev) => !prev)}
                    title="Toggle frameworks visibility"
                    aria-label={
                        areFrameworksVisible
                            ? 'Hide frameworks'
                            : 'Show frameworks'
                    }
                >
                    <KeyboardControlKey
                        className={`toggle-icon ${areFrameworksVisible ? '' : 'rotated'}`}
                    />
                </button>
            </div>
            {topicsCount &&
                areFrameworksVisible &&
                generateListItems(topicsCount.frameworks)}
            <div
                className={`tech-category-container ${areToolsVisible ? '' : 'rotated'}`}
            >
                <p className="tech-category">Tools</p>
                <button
                    className="toggle-visibility-button"
                    onClick={() => setAreToolsVisible((prev) => !prev)}
                    title="Toggle tools visibility"
                    aria-label={areToolsVisible ? 'Hide tools' : 'Show tools'}
                >
                    <KeyboardControlKey
                        className={`toggle-icon ${areToolsVisible ? '' : 'rotated'}`}
                    />
                </button>
            </div>
            {topicsCount &&
                areToolsVisible &&
                generateListItems(topicsCount.tools)}
        </ul>
    );
};

export default TechList;
