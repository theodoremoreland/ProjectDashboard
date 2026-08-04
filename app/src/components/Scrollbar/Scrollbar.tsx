// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../types';

// Styles
import './Scrollbar.css';

interface Props {
    projects: TaggedRepoData[] | undefined;
}

const Scrollbar = ({ projects }: Props): ReactElement => {
    const projectCount: number = projects ? projects.length : 1;

    return (
        <div id="Scrollbar">
            <div id="track">
                <div id="thumb" style={{ height: `${projectCount / 10}%` }} />
            </div>
        </div>
    );
};

export default Scrollbar;
