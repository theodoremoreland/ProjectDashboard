import React, { useEffect, useState } from 'react';

// Components
import TechList from '../TechList/TechList.jsx';

// Images
import { ReactComponent as DoubleArrowIcon } from "../../images/double-arrow-right.svg";

// Styles
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 769) {
            setIsOpen(false);
        }
    }, []);

    return (
        <aside
            id="sidebar"
            className={`${isOpen ? 'open' : 'closed'}`}
        >
            <button
                type="button"
                title="Toggle sidebar"
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'open' : 'closed'}`}
            >
                <DoubleArrowIcon className='icon double-arrow' />
            </button>
            <TechList />
        </aside>
    )
};


export default Sidebar;
