// React
import { ReactElement } from 'react';

// Custom
import { getPercentages } from '../../../utils/getPercentages';

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
    const percentages = getPercentages(languages || {});

    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Languages //</h3>
            <ul className="sidebar-list">
                {isTopLanguagesFetching && <p>Loading top languages...</p>}
                {percentages &&
                    Object.entries(percentages).map(
                        ([language, percentage]) => (
                            <li key={language}>
                                <span className="language-label">
                                    <h3>{language}</h3>
                                    <p>{percentage.toFixed(2)}%</p>
                                </span>
                                <div className="language-level-container">
                                    <span
                                        className="language-level"
                                        style={{
                                            width: `${percentage.toFixed(2)}%`,
                                        }}
                                    ></span>
                                </div>
                            </li>
                        )
                    )}
            </ul>
        </aside>
    );
};

export default Sidebar;
