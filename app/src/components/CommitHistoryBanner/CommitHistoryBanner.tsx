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
    const hasRecentActivity: boolean =
        commits?.[0]?.commit.message !== undefined;

    const handleOpen = () => setShowCommitHistory(true);
    const handleClose = () => setShowCommitHistory(false);

    return (
        <div className="commit-history-banner">
            <button
                onClick={handleOpen}
                className="commit-history-banner-button"
            >
                <h2 className="commit-history-banner-title">Recent</h2>
            </button>
            <p className="commit-history-preview">
                {hasRecentActivity
                    ? `@${commits![0].repository.name} - ${commits![0].commit.message}`
                    : 'No recent activity found.'}
            </p>
            {showCommitHistory && (
                <CommitHistory handleClose={handleClose} commits={commits} />
            )}
        </div>
    );
};

export default CommitHistoryBanner;
