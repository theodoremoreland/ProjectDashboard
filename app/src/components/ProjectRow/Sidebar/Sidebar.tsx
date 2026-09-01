// React
import { ReactElement, useEffect, useState } from 'react';

// Custom
import { generateLanguagesByPositionObject } from './Sidebar.utils';
import { convertBytesToPercentages } from '../../../utils/convertBytesToPercentages';

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
    const [languagesByPosition, setLanguagesByPosition] = useState(
        generateLanguagesByPositionObject()
    );

    useEffect(() => {
        if (languages) {
            const percentages = convertBytesToPercentages(languages);
            const updatedLanguagesByPosition =
                generateLanguagesByPositionObject();

            Object.entries(percentages)
                .sort((a, b) => b[1] - a[1])
                .forEach(([language, percentage], index) => {
                    if (index < 9) {
                        updatedLanguagesByPosition[index] = {
                            label: language,
                            percentage,
                        };
                    }
                });

            setLanguagesByPosition(updatedLanguagesByPosition);
        }
    }, [languages]);

    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Languages //</h3>
            <ul
                className={`sidebar-list ${isTopLanguagesFetching ? 'fetching' : ''}`}
            >
                {languagesByPosition &&
                    Object.entries(languagesByPosition).map(
                        ([position, { label, percentage }]) => (
                            <li key={position}>
                                <span
                                    className={`language-label ${label === 'Null' ? 'redacted' : ''}`}
                                >
                                    <h3>
                                        {label === 'Null' ? 'Nulll' : label}
                                    </h3>
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
