// React
import { ReactElement } from 'react';

// Styles
import './Sidebar.css';

const Sidebar = (): ReactElement => {
    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Languages //</h3>
            <ul className="sidebar-list">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <li key={item}>
                        <span className="language-label">
                            <h3>Language {item}</h3>
                            <p>100%</p>
                        </span>
                        <span className="language-level"></span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
