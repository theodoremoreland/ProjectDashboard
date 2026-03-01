import { ReactElement, useState, useContext } from 'react';

// Context
import { CommitContext } from '../../contexts/CommitContext/CommitContext';

// Custom
import CommitHistory from '../Modal/CommitHistory/CommitHistory';

// Styles
import './CommitHistoryBanner.css';

const CommitHistoryBanner = (): ReactElement => {
    const { commits } = useContext(CommitContext);
    const [showCommitHistory, setShowCommitHistory] = useState<boolean>(false);

    const handleOpen = () => setShowCommitHistory(true);
    const handleClose = () => setShowCommitHistory(false);

    return (
        <div className="commit-history-banner">
            <h2>Recent Commit</h2>
            <p>{commits?.[0]?.commit.message || 'No recent commits found.'}</p>
            <button onClick={handleOpen}>Recent Commits</button>
            {showCommitHistory && (
                <CommitHistory handleClose={handleClose} commits={commits} />
            )}
        </div>
    );
};

export default CommitHistoryBanner;
