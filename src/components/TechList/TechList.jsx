import React, { useContext, useEffect, useState } from 'react';

// Controller
import { getLiveDemosCount, getTopicCounts } from './TechList.controller';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext'; 

// Styles
import './TechList.css';

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
            <p id="live-demos">Live Demos: <span id="circle"></span> <span className='count'>{getLiveDemosCount(repos)}</span></p>
            <p className='tech-category'>Competencies</p>
            {topicsCount && Object.entries(topicsCount.competencies).sort(([k1, v1], [k2, v2]) => v2 - v1).map(([k, v]) => <li key={k}>{k}: <span className='count'>{v}</span></li>)}
            <p className='tech-category'>Languages</p>
            {topicsCount && Object.entries(topicsCount.languages).sort(([k1, v1], [k2, v2]) => v2 - v1).map(([k, v]) => <li key={k}>{k}: <span className='count'>{v}</span></li>)}
            <p className='tech-category'>Frameworks</p>
            {topicsCount && Object.entries(topicsCount.frameworks).sort(([k1, v1], [k2, v2]) => v2 - v1).map(([k, v]) => <li key={k}>{k}: <span className='count'>{v}</span></li>)}
            <p className='tech-category'>Tools</p>
            {topicsCount && Object.entries(topicsCount.tools).sort(([k1, v1], [k2, v2]) => v2 - v1).map(([k, v]) => <li key={k}>{k}: <span className='count'>{v}</span></li>)}
        </ul>
    )
};


export default TechList;
