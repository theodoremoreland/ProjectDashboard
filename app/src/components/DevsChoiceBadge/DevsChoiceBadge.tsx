// React
import { ReactElement } from 'react';

// Images
import ThumbUpIcon from '../../images/icons/thumb_up.svg?react';

// Styles
import './DevsChoiceBadge.css';

const DevsChoiceBadge = (): ReactElement => {
    return (
        <div className="DevsChoiceBadge">
            <span>Dev's</span>
            <ThumbUpIcon className="icon" />
            <span>Choice</span>
        </div>
    );
};

export default DevsChoiceBadge;
