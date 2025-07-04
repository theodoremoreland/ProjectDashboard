import { ReactElement } from 'react';

// Components
import TechList from '../TechList/TechList';

// Styles
import './Sidebar.css';

interface SidebarProps {
    sidebarRef?: (node?: Element | null) => void;
}

const Sidebar = ({ sidebarRef }: SidebarProps): ReactElement => {
    return (
        <aside id="sidebar" ref={sidebarRef}>
            <TechList />
        </aside>
    );
};

export default Sidebar;
