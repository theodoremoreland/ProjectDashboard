import { ReactElement } from 'react';

// Images
import InfoIcon from '../../assets/images/icons/info.svg?react';

// Styles
import './ToolBar.css';

interface Props {
    setShowOverviewModal: (show: boolean) => void;
}

const ToolBar = ({ setShowOverviewModal }: Props): ReactElement => {
    return (
        <footer id="app-toolbar">
            <div id="app-toolbar-content">
                <ul>
                    <li
                        id="nav-overview"
                        title="Overview"
                        role="presentation"
                        onClick={() => setShowOverviewModal(true)}
                    >
                        <InfoIcon className="info icon" />
                        <span>Overview</span>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default ToolBar;
