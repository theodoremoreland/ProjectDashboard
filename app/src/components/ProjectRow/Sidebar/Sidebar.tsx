import { ReactElement } from 'react';

// Styles
import './Sidebar.css';

const Sidebar = (): ReactElement => {
    return (
        <aside id="sidebar">
            <ul id="sidebar-list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <li key={item}>
                        <h3>Technology {item}</h3>
                        <span className="technology-level"></span>
                    </li>
                ))}
            </ul>
            <div id="project-video-preview"></div>
        </aside>
    );
};

export default Sidebar;
