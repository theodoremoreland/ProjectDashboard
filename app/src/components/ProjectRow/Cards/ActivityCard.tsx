// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../../types';

interface Props {
    projectData: TaggedRepoData;
}

const ActivityCard = ({ projectData }: Props): ReactElement => {
    return (
        <li className="project-card activity">
            <div>
                <article>
                    <h3>Recent commits</h3>
                    <ul className="commits">
                        {[]?.map((_, index) => (
                            <li key={index} className="commit">
                                <h4>Commit message</h4>
                                <p>
                                    {new Date().toLocaleString()}{' '}
                                    <i>@repository</i>
                                </p>
                                <a target="_blank" rel="noreferrer" href="#">
                                    View code diff on GitHub
                                </a>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
            <p>{projectData.name}</p>
        </li>
    );
};

export default ActivityCard;
