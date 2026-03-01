// React
import { ReactElement } from 'react';

// Custom
import Modal from '../Modal';

// Types
import { CommitData } from '../../../types';

interface Props {
    handleClose: () => void;
    commits: CommitData[] | undefined;
}

const CommitHistory = ({ handleClose, commits }: Props): ReactElement => {
    return (
        <Modal handleClose={handleClose}>
            <div>
                <article>
                    <h3>Recent Activity</h3>
                    <ul className="commits">
                        {commits?.map((commitData: CommitData) => (
                            <li key={commitData.sha} className="commit">
                                <h4>{commitData.commit.message}</h4>
                                <p>
                                    {new Date(
                                        commitData.commit.author.date
                                    ).toLocaleString()}{' '}
                                    <i>@{commitData.repository.name}</i>
                                </p>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={commitData.html_url}
                                >
                                    View code diff on GitHub
                                </a>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        </Modal>
    );
};

export default CommitHistory;
