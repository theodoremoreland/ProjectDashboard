import React from "react";

import { ReactComponent as DeployedCodeIcon } from "../../images/deployed-code.svg";
import { ReactComponent as CodeIcon } from "../../images/code.svg";
import { ReactComponent as StarIcon } from "../../images/star.svg";
import { ReactComponent as EventIcon } from "../../images/event.svg";
import { ReactComponent as EventRepeatIcon } from "../../images/event_repeat.svg";
import { ReactComponent as LandscapeIcon } from "../../images/landscape.svg";

// Custom styles
import "./ProjectDetail.css";

const getProjectContext = (projectData) => {
    if (projectData.topics?.some(topic => topic === "coursework" || topic === "exercise" )) {
        return "Coursework / Exercise";
    }

    else if (projectData.topics?.some(topic => topic === "professional")) {
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
                {/* Putting the onClick handler on the div because
                    the padding on the button wasn't triggering to onClick event.
                    This is a workaround to make the button padding clickable. 
                */}
                <div onClick={handleClose}>
                    <button
                        type="button"
                        title="Close"
                        className="close-button"
                    >
                        Close
                    </button>
                </div>
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
                            <tr title="The context in which this project was created. Can be either Coursework / Exercise, Professional, or Personal.">
                                <td>
                                    <div>
                                        <LandscapeIcon className="landscape icon" />
                                        <span>Context</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {getProjectContext(projectData)}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <EventIcon className="event icon" />
                                        <span>Created</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {new Date(projectData.date_created).toLocaleDateString()}
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <EventRepeatIcon className="event-repeat icon" />
                                        <span>Last modified</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {new Date(projectData.date_updated).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <StarIcon className="star icon" />
                                        <span>Stars</span>
                                    </div>
                                </td>
                                <td>
                                   <div>
                                        {projectData.stars}
                                   </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <CodeIcon className="code icon" />
                                        <span>Source code</span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <a href={projectData.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={`Click to view the source code for ${projectData.name}.`}
                                        >
                                            View on GitHub
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            {projectData.name !== "ProjectList" &&
                                <tr>
                                    <td>
                                        <div>
                                            <DeployedCodeIcon className="deployment icon" />
                                            <span>Deployment</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
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
                                        </div>
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
