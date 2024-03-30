import React from "react";

// Custom components
import README from "../../README/README";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({ projectData }) => {
    return (
        <div className="project-detail">
            <header><h1>Project List</h1><span>X</span></header>
            <section className="project-detail__header">
                <div>
                    <img className="project-detail__image" src={projectData.image} alt={projectData.name} />
                </div>
                <div>
                    <h1 className="project-detail__title">{projectData.name}</h1>
                    <p className="project-detail__description">{projectData.description}</p>
                </div>
            </section>
            <footer className="project-detail__footer">
                <ul>
                    { projectData.topics.map((topic) => <li key={topic}>{topic}</li>) }
                </ul>
            </footer>
        </div>
    );
};

export default ProjectDetail;
