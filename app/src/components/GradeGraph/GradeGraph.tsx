// React
import { ReactElement } from 'react';

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
            <span className={`GradeGraph__bar ${grade.toLowerCase()}`} />
        </div>
    );
};

export default GradeGraph;
