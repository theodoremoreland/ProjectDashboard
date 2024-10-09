import { ReactElement } from 'react';

import Modal from '../Modal';

interface Props {
    handleClose: () => void;
}

const Help = ({ handleClose }: Props): ReactElement => {
    return (
        <Modal title='Help' handleClose={handleClose}>
            <div>
                <p> 
                    This web application dynamically renders a list of my GitHub projects. Projects are
                    queried in real-time from the GitHub API and are displayed in semi-random order. 
                </p>
                <article>
                    <h3>Filter</h3>
                    <p>
                        Technologies listed on the left panel can be clicked to filter projects by corresponding technology.
                        Projects not featuring said technology will be disabled from the list. The numbers displayed next to each
                        technology represent the number of projects that utilize that technology.
                    </p>
                </article>
                <article>
                    <h3>Search</h3>
                    <p>
                        The search bar can be used to search for projects by name. The search is case-insensitive and will
                        display projects that contain the search term in their name or in their list of GitHub topics.
                    </p>
                </article>
                <article>
                    <h3>Analytics</h3>
                    <p>
                        Clicking on the analytics icon in the navbar will open a small analytics dashboard 
                    </p>
                </article>
                <p>
                    The source code for this project can be viewed <a target='_blank' rel='noreferrer' href="https://github.com/theodoremoreland/ProjectList">here</a>.
                </p>
            </div>
        </Modal>
    );
};

export default Help;