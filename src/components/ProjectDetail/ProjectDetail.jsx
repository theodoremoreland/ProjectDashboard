import React from "react";

import { ReactComponent as DeployedCodeIcon } from "../../images/deployed-code.svg";
import { ReactComponent as CodeIcon } from "../../images/code.svg";
import { ReactComponent as StarIcon } from "../../images/star.svg";
import { ReactComponent as EventIcon } from "../../images/event.svg";
import { ReactComponent as EventRepeatIcon } from "../../images/event_repeat.svg";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({ projectData, handleClose }) => {
    return (
        <div id="ProjectDetail">
            <header>
                <button type="button" title="Close" className="x" onClick={handleClose}>Close</button>
            </header>
            <article>
                <div id="image-container">
                    <img src={projectData.image} alt={projectData.name} />
                </div>
                <div id="info-container">
                    <h1>{projectData.name}</h1>
                    <p>{projectData.desc}</p>
                    <table id="metadata">
                        <tbody>
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
                                        /{projectData.name}
                                    </a>
                                </td>
                            </tr>
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
                                                Available
                                            </a>
                                        :   "None"
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ul id="topics" title="GitHub topic associated with this project.">
                        { projectData.topics.map((topic) => <li key={topic} className="topic">{topic}</li>) }
                    </ul>
                </div>
            </article>
        </div>
    );
};

export default ProjectDetail;
