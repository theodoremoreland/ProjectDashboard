import {
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

// Controller
import {
    findKeyForTopicLabel,
    findTopicLabelImageSrc,
    getTopicCounts,
    determineClassName,
} from "./TechList.controller";

// Context
import { ProjectsContext } from "../../contexts/ProjectsContext";

// Types
import { TopicCounts } from "../../types";

// Styles
import "./TechList.css";

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
                    const className: "" | "selected" | "filtered-out" =
                        determineClassName(topicLabel, featuredTopics);

                    return (
                        <li
                            key={topicLabel}
                            title={
                                className !== "selected"
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
                            {findTopicLabelImageSrc(topicLabel) ? (
                                <>
                                    <div className="tech-icon-container">
                                        <img
                                            src={findTopicLabelImageSrc(
                                                topicLabel
                                            )}
                                            alt={topicLabel}
                                            className="tech-icon"
                                        />
                                    </div>
                                    <div className="topic-label-container">
                                        {topicLabel}:
                                        <span className="count">
                                            {topicCount}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {topicLabel}:
                                    <span className="count">{topicCount}</span>
                                </>
                            )}
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
