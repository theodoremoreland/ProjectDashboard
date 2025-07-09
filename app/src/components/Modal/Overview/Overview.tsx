import { ReactElement } from 'react';

import Modal from '../Modal';

interface Props {
    handleClose: () => void;
}

const Overview = ({ handleClose }: Props): ReactElement => {
    return (
        <Modal title="Overview" handleClose={handleClose}>
            <div>
                <p>
                    This web application dynamically renders a list of my{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/theodoremoreland?tab=repositories"
                    >
                        GitHub repositories
                    </a>
                    . Repositories are queried in real-time from the{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.github.com/en/rest"
                    >
                        GitHub API
                    </a>
                    .
                </p>
                <p>
                    NOTE:{' '}
                    <i>
                        The terms "project" and "repository" are used
                        interchangeably throughout this application.
                    </i>
                </p>
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
