import React from "react";

// Custom components
import README from "../../README/README";

import { ReactComponent as DeployedCodeIcon } from "../../../images/deployed-code.svg";
import { ReactComponent as CodeIcon } from "../../../images/code.svg";
import { ReactComponent as PreviewIcon } from "../../../images/preview.svg";

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
                    <table className="metadata">
                        <tbody>
                            <tr>
                                <td>Created</td>
                                <td>{projectData.date_created}</td>
                            </tr>
                            <tr>
                                <td>Last modified</td>
                                <td>{projectData.date_updated}</td>
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
                            className="deployment"
                        >
                            <li>
                                <DeployedCodeIcon />
                                Deployment
                            </li>
                        </a>
                    }
                    <a href={projectData.url} target="_blank" rel="noreferrer">
                        <li>
                            <CodeIcon className="code-icon" />
                            Source code
                        </li>
                    </a>
                    <li>
                        <PreviewIcon />
                        <span>Preview README</span>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

export default ProjectDetail;
