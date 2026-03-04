import { ReactElement, useState, useContext } from 'react';

// Context
import { CommitContext } from '../../contexts/CommitContext/CommitContext';

// Custom
import CommitHistory from '../Modal/CommitHistory/CommitHistory';

// Images
import MoreIcon from '../../assets/images/icons/more_horiz.svg?react';

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
                title="View recent commit history"
            >
                <h3 className="commit-history-banner-title">Recent commits</h3>
                <p className="commit-history-preview">
                    {hasRecentActivity
                        ? `@${commits![0].repository.name} - ${commits![0].commit.message}`
                        : 'No recent activity found.'}
                </p>
                <MoreIcon className="more-icon" />
            </button>
            {showCommitHistory && (
                <CommitHistory handleClose={handleClose} commits={commits} />
            )}
        </div>
    );
};

export default CommitHistoryBanner;
