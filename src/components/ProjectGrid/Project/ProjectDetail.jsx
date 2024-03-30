import React from "react";

// Custom components
import README from "../../README/README";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({ projectData, handleClose }) => {
    return (
        <div className="project-detail">
            <header>
                <button type="button" title="Close" className="x" onClick={handleClose}>x</button>
            </header>
            <article>
                <div>
                    <img className="project-detail__image" src={projectData.image} alt={projectData.name} />
                </div>
                <div>
                    <h1 className="project-detail__title">{projectData.name}</h1>
                    <p className="project-detail__description">{projectData.desc}</p>
                    <ul className="links">
                        <li>
                            <a href={projectData.url} target="_blank" rel="noreferrer">Source code</a>
                        </li>
                        <li>
                            <a href={projectData.url} target="_blank" rel="noreferrer">README</a>
                        </li>
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
