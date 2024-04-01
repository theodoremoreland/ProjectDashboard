import React from "react";

import { ReactComponent as DeployedCodeIcon } from "../../../images/deployed-code.svg";
import { ReactComponent as CodeIcon } from "../../../images/code.svg";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({ projectData, handleClose }) => {
    return (
        <div className="project-detail">
            <header>
                <button type="button" title="Close" className="x" onClick={handleClose}>x</button>
            </header>
            <article>
                <div className="project-detail__image-container">
                    <img className="project-detail__image" src={projectData.image} alt={projectData.name} />
                </div>
                <div className="project-detail__info-container">
                    <h1 className="project-detail__title">{projectData.name}</h1>
                    <p className="project-detail__description">{projectData.desc}</p>
                    <table className="metadata">
                        <tbody>
                            <tr>
                                <td>Created</td>
                                <td>{new Date(projectData.date_created).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Last modified</td>
                                <td>{new Date(projectData.date_updated).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Stars</td>
                                <td>{projectData.stars}</td>
                            </tr>
                        </tbody>
                    </table>
                    <ul className="topics" title="GitHub topic associated with this project.">
                        { projectData.topics.map((topic) => <li key={topic} className="topic">{topic}</li>) }
                    </ul>
                </div>
            </article>
            <footer className="project-detail__footer">
                <ul className="links">
                    {projectData.demo_link && 
                        <a
                            href={projectData.demo_link} 
                            target="_blank"
                            rel="noreferrer"
                            title={`Click to view a live demo of the ${projectData.name} project.`}
                            className="deployment-link"
                        >
                            <li>
                                <DeployedCodeIcon className="deployment-icon" />
                            </li>
                        </a>
                    }
                    <a 
                        href={projectData.url}
                        target="_blank"
                        rel="noreferrer"
                        title={`Click to view the source code for ${projectData.name}.`}
                    >
                        <li>
                            <CodeIcon className="code-icon" />
                        </li>
                    </a>
                </ul>
            </footer>
        </div>
    );
};

export default ProjectDetail;
