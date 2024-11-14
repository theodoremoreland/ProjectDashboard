import { ReactElement } from "react";

import Modal from "../Modal";

// Images
import QueryStatsIcon from "../../../images/icons/query_stats.svg?react";
import preview from "../../../images/preview.gif";
import filter from "../../../images/filter.gif";

interface Props {
    handleClose: () => void;
}

const Overview = ({ handleClose }: Props): ReactElement => {
    return (
        <Modal title="Overview" handleClose={handleClose}>
            <div>
                <p>
                    This web application dynamically renders a list of my{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/theodoremoreland?tab=repositories"
                    >
                        GitHub repositories
                    </a>
                    . Repositories are queried in real-time from the{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.github.com/en/rest"
                    >
                        GitHub API
                    </a>{" "}
                    and are displayed in semi-random order.
                </p>
                <p>
                    NOTE:{" "}
                    <i>
                        The terms "project" and "repository" are used
                        interchangeably throughout this application.
                    </i>
                </p>
                <article>
                    <h3>Preview</h3>
                    <p>
                        Each project is displayed as a thumbnail. Upon hovering
                        over a thumbnail, a thumbnail overlay appears featuring
                        the project's name and a list of icons representing the
                        programming languages used.
                    </p>
                    <img className="example" src={preview} alt="preview" />
                    <p>
                        Additionally, each thumbnail overlay features a{" "}
                        <button
                            title="learn more"
                            type="button"
                            className="learn-more-button"
                        >
                            Learn More
                        </button>{" "}
                        button, that when clicked, will display additional
                        information about the project.
                    </p>
                    <p>
                        Conditionally, a{" "}
                        <button title="live demo" className="live-demo">
                            Live Demo <span className="circle"></span>
                        </button>{" "}
                        button appears if the project is actively hosted on a
                        live server. Clicking the button will open a new tab
                        featuring the web application.
                    </p>
                </article>
                <article>
                    <h3>Filter</h3>
                    <p>
                        Technologies listed on the left panel can be clicked to
                        filter projects by corresponding technology. The numbers
                        displayed next to each technology represent the number
                        of projects that utilize that technology.
                    </p>
                    <p>
                        Multiple filters can be applied simultaneously. Any
                        project that does not feature any of the selected
                        technologies will be hidden.
                    </p>
                    <img className="example" src={filter} alt="filter" />
                </article>
                <article>
                    <h3>Search</h3>
                    <p>
                        The search bar can be used to search for projects by
                        name or{" "}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics"
                        >
                            GitHub topic
                        </a>
                        .
                    </p>
                    <p
                        style={{
                            lineHeight: "2.2em",
                        }}
                    >
                        Some examples include:{" "}
                        <span className="topic">responsive</span>{" "}
                        <span className="topic">mui-x</span>{" "}
                        <span className="topic">tanstack-react-query</span>{" "}
                        <span className="topic">jupyter-notebook</span>{" "}
                        <span className="topic">rest-api</span>
                    </p>
                </article>
                <article>
                    <h3>Analyze</h3>
                    <p>
                        Clicking on the{" "}
                        <QueryStatsIcon
                            title="analytics icon"
                            className="query_stats icon"
                        />{" "}
                        icon in the navbar will display aggregate statistics
                        about the projects featured.
                    </p>
                </article>
                <article>
                    <h3>Source Code</h3>
                    <p>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/theodoremoreland/ProjectList"
                        >
                            The source code for this web application is
                            available on GitHub
                        </a>
                        .
                    </p>
                </article>
            </div>
        </Modal>
    );
};

export default Overview;
