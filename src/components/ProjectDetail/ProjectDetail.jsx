import React from "react";

import { ReactComponent as DeployedCodeIcon } from "../../images/deployed-code.svg";
import { ReactComponent as CodeIcon } from "../../images/code.svg";
import { ReactComponent as StarIcon } from "../../images/star.svg";
import { ReactComponent as EventIcon } from "../../images/event.svg";
import { ReactComponent as EventRepeatIcon } from "../../images/event_repeat.svg";

// Custom styles
import "./ProjectDetail.css";

const getProjectContext = (projectData) => {
    if (projectData.topics.some(topic => topic === "coursework" || topic === "exercise" )) {
        return "Coursework";
    }

    else if (projectData.topics.some(topic => topic === "professional")) {
        return "Professional";
    }

    else {
        return "Personal";
    }
};

const ProjectDetail = ({ projectData, handleClose }) => {
    return (
        <section id="ProjectDetail">
            <nav id="project-detail-nav">
                <button type="button" title="Close" className="close-button" onClick={handleClose}>Close</button>
            </nav>
            <div id="project-detail-content" className="row">
                <div id="image-container">
                    <img src={projectData.image} alt={projectData.name} />
                </div>
                <div id="info-container">
                    <h1>{projectData.name}</h1>
                    <p>
                        {projectData.name !== "ProjectList" ? projectData.desc : `You are currently viewing this project.`}
                    </p>
                    <table id="metadata">
                        <tbody>
                            <tr title="The context in which this project was created. Can be either Coursework, Professional, or Personal.">
                                <td>
                                    <span>Context</span>
                                </td>
                                <td>{getProjectContext(projectData)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <EventIcon className="event icon" />
                                    <span>Created</span>
                                </td>
                                <td>{new Date(projectData.date_created).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>
                                    <EventRepeatIcon className="event-repeat icon" />
                                    <span>Last modified</span>
                                </td>
                                <td>{new Date(projectData.date_updated).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>
                                    <StarIcon className="star icon" />
                                    <span>Stars</span>
                                </td>
                                <td>{projectData.stars}</td>
                            </tr>
                            <tr>
                                <td>
                                    <CodeIcon className="code icon" />
                                    <span>Source code</span>
                                </td>
                                <td>
                                    <a href={projectData.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={`Click to view the source code for ${projectData.name}.`}
                                    >
                                        View on GitHub
                                    </a>
                                </td>
                            </tr>
                            {projectData.name !== "ProjectList" &&
                                <tr>
                                    <td>
                                        <DeployedCodeIcon className="deployment icon" />
                                        <span>Deployment</span>
                                    </td>
                                    <td>
                                        { projectData.demo_link
                                            ?   <a
                                                    href={projectData.demo_link} 
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title={`Click to view a live demo of the ${projectData.name} project.`}
                                                    className="deployment-link"
                                                >
                                                    View Live Demo{" "}<span className="circle"></span>
                                                </a>
                                            :   "None"
                                        }
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <ul id="topics" title="GitHub topic associated with this project.">
                        { projectData.topics.map((topic) => <li key={topic} className="topic">{topic}</li>) }
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
