// React
import { ReactElement, useState } from 'react';

// Components
import SearchBar from '../SearchBar/SearchBar';
import TechList from '../TechList/TechList';

// Images
import InfoIcon from '../../assets/images/icons/info.svg?react';
import PersonIcon from '../../assets/images/icons/person.svg?react';
import FilterListIcon from '../../assets/images/icons/filter_list.svg?react';

// Styles
import './ToolBar.css';

interface Props {
    scrollToProject: (id: string) => void;
    setShowOverviewModal: (show: boolean) => void;
}

const ToolBar = ({
    setShowOverviewModal,
    scrollToProject,
}: Props): ReactElement => {
    const [showTechList, setShowTechList] = useState<boolean>(false);

    return (
        <footer id="app-toolbar">
            {showTechList && <TechList setShowTechList={setShowTechList} />}
            <div id="app-toolbar-content">
                <div id="toolbar-left">
                    <SearchBar scrollToProject={scrollToProject} />
                </div>
                <ul id="toolbar-right">
                    <li className="toolbar-item">
                        <PersonIcon className="person icon" />
                    </li>
                    <li
                        title="Filter projects"
                        onClick={() => setShowTechList(true)}
                        className="toolbar-item"
                    >
                        <FilterListIcon className="filter icon" />
                    </li>
                    <li
                        id="nav-overview"
                        title="Overview"
                        role="presentation"
                        onClick={() => setShowOverviewModal(true)}
                        className="toolbar-item"
                    >
                        <InfoIcon className="info icon" />
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default ToolBar;
