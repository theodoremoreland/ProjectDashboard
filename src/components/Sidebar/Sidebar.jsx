import React from 'react';

// Components
import TechList from '../TechList/TechList.jsx';

// Styles
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside id="sidebar">
            <p id="live-demos">Live Demos <span id="circle"></span></p>
            <TechList />
        </aside>
    )
};


export default Sidebar;
