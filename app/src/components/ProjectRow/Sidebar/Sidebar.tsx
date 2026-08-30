// React
import { ReactElement } from 'react';

// Styles
import './Sidebar.css';

interface Props {
    languages?: { [key: string]: number };
    isTopLanguagesFetching?: boolean;
}

const Sidebar = ({
    languages,
    isTopLanguagesFetching,
}: Props): ReactElement => {
    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Languages //</h3>
            <ul className="sidebar-list">
                {isTopLanguagesFetching && <p>Loading top languages...</p>}
                {languages &&
                    Object.entries(languages).map(([language, percentage]) => (
                        <li key={language}>
                            <span className="language-label">
                                <h3>{language}</h3>
                                <p>{percentage}%</p>
                            </span>
                            <span className="language-level"></span>
                        </li>
                    ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
