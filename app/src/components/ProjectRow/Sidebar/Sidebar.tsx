// React
import { ReactElement } from 'react';

// Styles
import './Sidebar.css';

const Sidebar = (): ReactElement => {
    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Languages //</h3>
            <ul className="sidebar-list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <li key={item}>
                        <h3>Language {item}</h3>
                        <span className="language-level"></span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
