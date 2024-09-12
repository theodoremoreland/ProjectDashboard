import { ReactElement } from 'react';

// Components
import SearchBar from '../SearchBar/SearchBar';

// Images
import QueryStatsIcon from "../../images/query_stats.svg?react";
import HelpIcon from "../../images/help.svg?react";

// Styles
import './NavBar.css';

interface Props {
  setShowAnalytics: (show: boolean) => void;
  setShowHelpModal: (show: boolean) => void;
}

const NavBar = ({ setShowAnalytics, setShowHelpModal }: Props): ReactElement => {
    return (
      <nav id="app-nav">
        <h1>Project List</h1>
        <SearchBar />
        <ul>
          <li 
            id="analytics-nav"
            title='Analytics'
            role='presentation'
            onClick={() => setShowAnalytics(true)}
          >
            <QueryStatsIcon className="query_stats icon" />
          </li>
          <li
            id="nav-help"
            title='Help'
            role='presentation'
            onClick={() => setShowHelpModal(true)}
          >
            <HelpIcon className="help icon" />
          </li>
        </ul>
      </nav>
    )
};


export default NavBar;
