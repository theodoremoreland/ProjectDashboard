import { ReactElement } from 'react';

import Modal from '../Modal';

interface Props {
    handleClose: () => void;
}

const Overview = ({ handleClose }: Props): ReactElement => {
    return (
        <Modal handleClose={handleClose}>
            <div>
                <article>
                    <h3>Abstract</h3>
                    <p>
                        This project was originally designed around a pitch to
                        management about moving laterally within the company
                        from Data Engineer to Software Engineer. To supplement
                        my argument, this web application dynamically renders a
                        list of my{' '}
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
                        . It features search, filtering, and analytics thus
                        providing the facts and figures needed to support my
                        case.
                    </p>
                    <p>
                        My argument succeeded after a series of discussions and
                        a detailed walkthrough of this project. I've since
                        iterated on this project and have occasionally
                        positioned it as an interim portfolio (i.e. a substitute
                        for my "real" portfolio while I work on completing it).
                        Given its original purpose, it lacks the resources and
                        workflow of an actual portfolio. There is no resume,
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
                        deployment is responsive and deployed via CI/CD pipeline
                        or scripted deployment. Every project features a GitHub
                        link and screenshots pulled dynamically from their
                        corresponding GitHub README.md, which can be explored
                        via the "Explore" button.
                    </p>
                </article>
                <article>
                    <h3>Source Code</h3>
                    <p>
                        Learn more about this project by visiting the {''}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/theodoremoreland/ProjectDashboard"
                        >
                            repository on GitHub
                        </a>
                        .
                    </p>
                </article>
            </div>
        </Modal>
    );
};

export default Overview;
