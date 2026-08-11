// React
import { ReactElement } from 'react';

// Components
import SearchBar from '../SearchBar/SearchBar';

// Images
import InfoIcon from '../../assets/images/icons/info.svg?react';
import PersonIcon from '../../assets/images/icons/person.svg?react';

// Styles
import './ToolBar.css';

interface Props {
    setShowOverviewModal: (show: boolean) => void;
}

const ToolBar = ({ setShowOverviewModal }: Props): ReactElement => {
    return (
        <footer id="app-toolbar">
            <div id="app-toolbar-content">
                <div id="toolbar-left">
                    <SearchBar />
                </div>
                <ul id="toolbar-right">
                    <li className="interactive">
                        <PersonIcon className="person icon" />
                    </li>
                    <li
                        id="nav-overview"
                        className="interactive"
                        title="Overview"
                        role="presentation"
                        onClick={() => setShowOverviewModal(true)}
                    >
                        <InfoIcon className="info icon" />
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default ToolBar;
