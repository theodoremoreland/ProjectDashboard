import React, { useCallback, useContext, useEffect, useState } from 'react';

// Controller
import { findKeyForTopicLabel, getTopicCounts } from './TechList.controller';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext'; 

// Styles
import './TechList.css';

const TechList = () => {
    const { repos, updateFeaturedTopics } = useContext(ProjectsContext);
    const [topicsCount, setTopicsCount] = useState(null);

    const generateListItems = useCallback((topics) => {
        return Object
            .entries(topics)
            .sort(([k1, v1], [k2, v2]) => v2 - v1)
            .map(([k, v]) => <li key={k} data-filter-active="false" onClick={(e) => {
                const target = e.currentTarget;

                target.dataset.filterActive = target.dataset.filterActive === 'true' ? 'false' : 'true';

                updateFeaturedTopics(findKeyForTopicLabel(k));
              }}>{k}:<span className='count'>{v}</span></li>);
    }, [updateFeaturedTopics]);

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
