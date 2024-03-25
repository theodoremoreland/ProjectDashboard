import React from 'react';

// Bootstrap
import Image from "react-bootstrap/Image";

// Images
import octocatIcon from "../../images/Octocat.png";
import linkedInIcon from "../../images/LI-In-Bug.png";

// Styles
import './NavBar.css';

const NavBar = () => {
    return (
        <nav id="app-nav">
            <h1>Project List</h1>
            <input type="text" id="search" placeholder="Search..." />
            <ul>
                <li>
                <a
            href="https://github.com/theodoremoreland"
            rel="noopener noreferrer"
            target="_blank"
            title="My GitHub Profile"
          >
            <Image className="octocatIcon" src={octocatIcon} fluid />
          </a>
                </li>
                <li>
                <a
            href="https://www.linkedin.com/in/theodore-moreland/"
            rel="noopener noreferrer"
            target="_blank"
            title="My LinkedIn Profile"
          >
            <Image className="linkedInIcon" src={linkedInIcon} fluid />
          </a>
                </li>
            </ul>
        </nav>
    )
};


export default NavBar;
