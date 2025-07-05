import { ReactElement } from 'react';

// Components
import TechList from '../TechList/TechList';

// Styles
import './Sidebar.css';

const Sidebar = (): ReactElement => {
    return (
        <aside id="sidebar">
            <TechList />
        </aside>
    );
};

export default Sidebar;
