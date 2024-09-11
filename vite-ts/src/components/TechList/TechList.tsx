import { useCallback, useContext, useEffect, useState } from 'react';

// Controller
import { findKeyForTopicLabel, getTopicCounts } from './TechList.controller';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext'; 

// Styles
import './TechList.css';

const TechList = () => {
    const { repos, updateFeaturedTopics, featuredTopics } = useContext(ProjectsContext);
    const [topicsCount, setTopicsCount] = useState(null);

    const generateListItems = useCallback((topics) => {
        const determineClassName = (topicLabel) => {
            if (featuredTopics.size === 0) {
                return '';
            }

            if (featuredTopics.has(findKeyForTopicLabel(topicLabel))) {
                return 'selected';
            }

            return 'filtered-out';
        }

        
        return Object
            .entries(topics)
            .sort(([topicLabel1, topicCount1], [topicLabel2, topicCount2]) => topicCount2 - topicCount1)
            .map(([topicLabel, topicCount]) => 
                <li
                    key={topicLabel}
                    className={`${determineClassName(topicLabel)}`}
                    onClick={() => updateFeaturedTopics(findKeyForTopicLabel(topicLabel))}
                >
                    {topicLabel}:<span className='count'>{topicCount}</span>
                </li>
                );
    }, [updateFeaturedTopics, featuredTopics]);

    useEffect(() => {
        if (repos) {
            setTopicsCount(getTopicCounts(repos));
        };
    }, [repos]);

    return (
        <ul id="tech-list">
            <p className='tech-category'>Competencies</p>
            {topicsCount && generateListItems(topicsCount.competencies)}
            <p className='tech-category'>Languages</p>
            {topicsCount && generateListItems(topicsCount.languages)}
            <p className='tech-category'>Frameworks</p>
            {topicsCount && generateListItems(topicsCount.frameworks)}
            <p className='tech-category'>Tools</p>
            {topicsCount && generateListItems(topicsCount.tools)}
        </ul>
    )
};


export default TechList;
