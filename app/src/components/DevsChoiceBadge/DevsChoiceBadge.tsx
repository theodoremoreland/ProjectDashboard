// React
import { ReactElement } from 'react';

// Images
import WorkSpacePremiumIcon from '../../images/icons/workspace_premium.svg?react';

// Styles
import './DevsChoiceBadge.css';

const DevsChoiceBadge = (): ReactElement => {
    return (
        <div className="DevsChoiceBadge">
            <span>Dev's</span>
            <WorkSpacePremiumIcon className="icon" />
            <span>Choice</span>
        </div>
    );
};

export default DevsChoiceBadge;
