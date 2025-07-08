// React
import { ReactElement } from 'react';

// Images
import htmlIcon from '../../../images/languages/html.png';
import javascriptIcon from '../../../images/languages/javascript.png';
import typescriptIcon from '../../../images/languages/typescript.png';
import pythonIcon from '../../../images/languages/python.png';
import javaIcon from '../../../images/languages/java.png';
import vbaIcon from '../../../images/languages/vba.png';
import sqlIcon from '../../../images/languages/sql.png';

export const renderLanguageIcon = (topic: string): ReactElement | null => {
    const titleTemplate = 'This project was written with ';

    switch (topic) {
        case 'html':
            return (
                <li key={topic} title={titleTemplate + 'HTML'}>
                    <img src={htmlIcon} alt="HTML" className="language-icon" />
                </li>
            );
        case 'javascript':
            return (
                <li key={topic} title={titleTemplate + 'JavaScript'}>
                    <img
                        src={javascriptIcon}
                        alt="JavaScript"
                        className="language-icon"
                    />
                </li>
            );
        case 'typescript':
            return (
                <li key={topic} title={titleTemplate + 'TypeScript'}>
                    <img
                        src={typescriptIcon}
                        alt="TypeScript"
                        className="language-icon"
                    />
                </li>
            );
        case 'python':
            return (
                <li key={topic} title={titleTemplate + 'Python'}>
                    <img
                        src={pythonIcon}
                        alt="Python"
                        className="language-icon"
                    />
                </li>
            );
        case 'java':
            return (
                <li key={topic} title={titleTemplate + 'Java'}>
                    <img src={javaIcon} alt="Java" className="language-icon" />
                </li>
            );
        case 'vba':
            return (
                <li key={topic} title={titleTemplate + 'VBA'}>
                    <img src={vbaIcon} alt="VBA" className="language-icon" />
                </li>
            );
        case 'sql':
            return (
                <li key={topic} title={titleTemplate + 'SQL'}>
                    <img src={sqlIcon} alt="SQL" className="language-icon" />
                </li>
            );
        default:
            return null;
    }
};
