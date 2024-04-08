import React from 'react';

// Components
import SearchBar from '../SearchBar/SearchBar';

// Images
import { ReactComponent as QueryStatsIcon } from "../../images/query_stats.svg";
import { ReactComponent as HelpIcon } from "../../images/help.svg";

// Styles
import './NavBar.css';

const NavBar = ({ setShowAnalytics, setShowHelpModal }) => {
    return (
      <nav id="app-nav">
        <h1>Project List</h1>
        <SearchBar />
        <ul>
          <li 
            title='Analytics'
            role='presentation'
            onClick={() => setShowAnalytics(true)}
          >
            <QueryStatsIcon className="query_stats icon" />
          </li>
          <li
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
