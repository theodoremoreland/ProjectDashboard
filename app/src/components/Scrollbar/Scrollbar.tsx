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
    handleMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Scrollbar = ({
    projects,
    trackRef,
    thumbRef,
    handleMouseDown,
}: Props): ReactElement => {
    const projectCount: number = projects ? projects.length : 1;

    return (
        <div id="Scrollbar">
            <div id="track" ref={trackRef}>
                <div
                    id="thumb"
                    className="interactive"
                    style={{ height: `${projectCount / 10}%` }}
                    ref={thumbRef}
                    onMouseDown={handleMouseDown}
                />
            </div>
        </div>
    );
};

export default Scrollbar;
