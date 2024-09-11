import { ReactElement, useEffect, useState } from 'react';

// Components
import TechList from '../TechList/TechList';

// Images
import DoubleArrowIcon from "../../images/double-arrow-right.svg?react";

// Styles
import './Sidebar.css';

const Sidebar = (): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

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
