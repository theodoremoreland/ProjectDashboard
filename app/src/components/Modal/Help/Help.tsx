import { ReactElement } from 'react';

import Modal from '../Modal';

interface Props {
    handleClose: () => void;
}

const Help = ({ handleClose }: Props): ReactElement => {
    return (
        <Modal title='Overview' handleClose={handleClose}>
            <div>
                <p> 
                    This web application dynamically renders a list of my <a target='_blank' rel='noreferrer' href="https://github.com/theodoremoreland?tab=repositories">GitHub repositories</a>. Repositories are
                    queried in real-time from the <a target='_blank' rel='noreferrer' href="https://docs.github.com/en/rest">GitHub API</a> and are displayed in semi-random order.
                </p>
                <p>
                    NOTE: <i>The terms "project" and "repository" are used interchangeably throughout this application.</i>
                </p>
                <article>
                    <h3>Preview</h3>
                    <p>
                        Each project is displayed as a thumbnail. Upon hovering over a thumbnail, a thumbnail overlay appears
                        featuring the project's name and a list of icons representing the programming languages used.
                    </p>
                    <p>
                        Additionally, each thumbnail overlay features a <b>Learn More</b> button, that when clicked, will display
                        additional information about the project.
                    </p>
                    <p>
                        Conditionally, a <b>Live Demo</b> button appears if the project is actively hosted on a live server. Clicking
                        the button will open a new tab featuring the web application.
                    </p>
                </article>
                <article>
                    <h3>Filter</h3>
                    <p>
                        Technologies listed on the left panel can be clicked to filter projects by corresponding technology. The numbers displayed next to each
                        technology represent the number of projects that utilize that technology.
                    </p>
                </article>
                <article>
                    <h3>Search</h3>
                    <p>
                        The search bar can be used to search for projects by name. The search is case-insensitive and will
                        display projects that contain the search term in their name or in their list of <a target='_blank' rel='noreferrer' href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics">GitHub topics</a>.
                    </p>
                </article>
                <article>
                    <h3>Analytics</h3>
                    <p>
                        Clicking on the analytics icon in the navbar will display aggregate statistics about the projects featured.

                    </p>
                </article>
                <p>
                    <a target='_blank' rel='noreferrer' href="https://github.com/theodoremoreland/ProjectList">View the source code for this web application</a>
                </p>
            </div>
        </Modal>
    );
};

export default Help;