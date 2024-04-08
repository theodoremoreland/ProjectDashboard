import React from 'react';

import Modal from '../Modal';

const Help = ({ handleClose }) => {
    return (
        <Modal title='Help' handleClose={handleClose}>
            <div>
                <p> 
                    Project List dynamically renders a list of my GitHub repositories by leveraging
                    the GitHub API. The projects featured meet a specific set of criteria and thus do
                    not feature every repository that I own.
                </p>
                <ul>
                    The following features are available
                    <li>
                        - Projects can be filtered by toggling items in the sidebar.
                    </li>
                    <li>
                        - Projects can be searched by name or GitHub topic in the search bar.
                    </li>
                    <li>
                        - Project List data can be viewed by clicking on the analytics icon in the navbar.
                    </li>
                </ul>
            </div>
        </Modal>
    );
};

export default Help;