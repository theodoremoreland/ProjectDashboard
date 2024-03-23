import React, { useContext, useEffect, useState } from 'react';

// Controller
import { getTopicCounts } from './TechList.controller';

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
            <p>Languages</p>
            {topicsCount && Object.entries(topicsCount.languages).map(([k, v]) => <li>{k}: {v}</li>)}
            <p>Frameworks</p>
            {topicsCount && Object.entries(topicsCount.frameworks).map(([k, v]) => <li>{k}: {v}</li>)}
            <p>Competencies</p>
            {topicsCount && Object.entries(topicsCount.competencies).map(([k, v]) => <li>{k}: {v}</li>)}
            <p>Tools</p>
            {topicsCount && Object.entries(topicsCount.tools).map(([k, v]) => <li>{k}: {v}</li>)}
        </ul>
    )
};


export default TechList;
