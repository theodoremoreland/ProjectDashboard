import React, { useContext, useMemo } from 'react';

// Controller
import { getTopicCounts } from './TechList.controller';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext'; 

// Styles
import './TechList.css';

const TechList = () => {
    const { repos } = useContext(ProjectsContext);
    const topicsCount = useMemo(() => getTopicCounts(repos), [repos]);

    return (
        <ul id="tech-list">
            <p>Languages</p>
            {Object.entries(topicsCount.languages).map(([k, v]) => <li>{k}:{v}</li>)}
            <p>Frameworks</p>
            {Object.entries(topicsCount.frameworks).map(([k, v]) => <li>{k}:{v}</li>)}
            <p>Competencies</p>
            {Object.entries(topicsCount.competencies).map(([k, v]) => <li>{k}:{v}</li>)}
            <p>Tools</p>
            {Object.entries(topicsCount.tools).map(([k, v]) => <li>{k}:{v}</li>)}
        </ul>
    )
};


export default TechList;
