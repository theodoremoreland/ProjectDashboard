import React from 'react';

// Images
import { ReactComponent as QueryStatsIcon } from "../../images/query_stats.svg";
import { ReactComponent as HelpIcon } from "../../images/help.svg";

// Styles
import './NavBar.css';

const NavBar = () => {
    return (
      <nav id="app-nav">
        <h1>Project List</h1>
        <input type="text" id="search" placeholder="Search..." />
        <ul>
          <li 
            title='Analytics'
            role='presentation'
            onClick={() => {}}
          >
            <QueryStatsIcon className="query_stats icon" />
          </li>
          <li
            title='Help'
            role='presentation'
            onClick={() => {}}
          >
            <HelpIcon className="help icon" />
          </li>
        </ul>
      </nav>
    )
};


export default NavBar;
