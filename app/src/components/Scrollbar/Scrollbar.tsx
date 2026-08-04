// React
import { ReactElement } from 'react';

// Types
import { TaggedRepoData } from '../../types';

// Styles
import './Scrollbar.css';

interface Props {
    projects: TaggedRepoData[] | undefined;
    trackRef?: React.RefObject<HTMLDivElement>;
    thumbRef?: React.RefObject<HTMLDivElement>;
}

const Scrollbar = ({ projects, trackRef, thumbRef }: Props): ReactElement => {
    const projectCount: number = projects ? projects.length : 1;

    return (
        <div id="Scrollbar">
            <div id="track" ref={trackRef}>
                <div
                    id="thumb"
                    style={{ height: `${projectCount / 10}%` }}
                    ref={thumbRef}
                />
            </div>
        </div>
    );
};

export default Scrollbar;
