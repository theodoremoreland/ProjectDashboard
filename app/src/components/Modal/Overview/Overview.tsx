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
                <article>
                    <h3>Abstract</h3>
                    <p>
                        This project was originally designed around a pitch to
                        my manager about moving laterally within the company
                        from Data Engineer to Software Engineer. I intended to
                        supplement an argument that my skills and interests were
                        more aligned with software engineering through this
                        dashboard. This project features search, filtering, and
                        analytics related to my public GitHub repositories,
                        providing the facts and figures needed to support my
                        case.
                    </p>
                    <p>
                        My argument ultimately succeeded after a series of
                        discussions, one of which involved a detailed
                        walkthrough of this project. I've since iterated on this
                        project and have occasionally positioned it as an
                        interim portfolio. But naturally, given its original
                        purpose, it lacks the resources and workflow of a
                        typical portfolio project. There is no resume,
                        head-shot, contact information, nor professional
                        summary, and it makes little effort to highlight
                        specific projects or skills.
                    </p>
                </article>
                <article>
                    <h3>So what now?</h3>
                    <p>
                        This application features many active web apps that can
                        be visited by hovering over its corresponding thumbnail
                        and clicking the "Live Demo" button. Each active
                        deployment is responsive and deployed via CI/CD
                        pipeline. Everything else features a link to detailed
                        READMEs on GitHub upon clicking the "Learn More" button.
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
