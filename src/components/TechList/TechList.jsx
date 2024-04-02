import React, { useContext, useEffect, useState } from 'react';

// Controller
import { getLiveDemosCount, getTopicCounts } from './TechList.controller';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext'; 

// Styles
import './TechList.css';

const generateListItems = (topics) => {
    return Object
        .entries(topics)
        .sort(([k1, v1], [k2, v2]) => v2 - v1)
        .map(([k, v]) => <li key={k}>{k}:<span className='count'>{v}</span></li>);
};

const TechList = () => {
    const { repos } = useContext(ProjectsContext);
    const [topicsCount, setTopicsCount] = useState(null);

    useEffect(() => {
        if (repos) {
            setTopicsCount(getTopicCounts(repos));
        };
    }, [repos]);

    return (
        <ul id="tech-list">
            <p id="live-demos">Live Demos:<span className='count'>{getLiveDemosCount(repos)}</span></p>
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
