// React
import { ReactElement } from 'react';

// Images
import CommitIcon from '../../assets/images/icons/commit.svg?react';

// Styles
import './GradeGraph.css';

interface Props {
    grade: string;
}

const GradeGraph = ({ grade }: Props): ReactElement => {
    return (
        <div className="GradeGraph">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`GradeGraph__block`} />
            ))}
            <div className={`GradeGraph__bar ${grade.toLowerCase()}`}>
                <CommitIcon className="point" />
            </div>
        </div>
    );
};

export default GradeGraph;
