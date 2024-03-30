import React from "react";

// Custom components
import README from "../../README/README";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({ projectData }) => {
    return (
        <div className="project-detail">
            <header>
                <span>X</span>
            </header>
            <article>
                <div>
                    <img className="project-detail__image" src={projectData.image} alt={projectData.name} />
                </div>
                <div>
                    <h1 className="project-detail__title">{projectData.name}</h1>
                    <p className="project-detail__description">{projectData.desc}</p>
                    <ul>
                        <li>Date created: {projectData.date_created}</li>
                        <li>Date updated: {projectData.date_updated}</li>
                    </ul>
                    <ul>
                        <li>Source code</li>
                        <li>README</li>
                    </ul>
                </div>
            </article>
            <footer className="project-detail__footer">
                <ul>
                    { projectData.topics.map((topic) => <li key={topic}>{topic}</li>) }
                </ul>
            </footer>
        </div>
    );
};

export default ProjectDetail;
