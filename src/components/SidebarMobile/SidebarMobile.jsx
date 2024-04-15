import React, { useState } from 'react';

// Components
import TechList from '../TechList/TechList.jsx';

// Styles
import './SidebarMobile.css';

const SidebarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside id="sidebar-mobile" className={isOpen ? 'open' : 'close'}>
            <TechList />
            <button
                id="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {"> > >"}
            </button>
        </aside>
    )
};


export default SidebarMobile;
