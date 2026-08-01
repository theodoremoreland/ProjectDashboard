// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../types';

interface Props {
    project: TaggedRepoData;
}

const CodeQualityCard = ({ project }: Props): ReactElement => {
    return (
        <li className="project-card code-quality">
            <ul>
                <li>Security</li>
                <li>Maintainability</li>
                <li>Reliability</li>
            </ul>
        </li>
    );
};

export default CodeQualityCard;
