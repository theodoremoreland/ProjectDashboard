// React
import { ReactElement } from 'react';

// Images
import CommitIcon from '../../assets/images/icons/commit.svg?react';

// Styles
import './GradeGraph.css';

interface Props {
    measure: number | undefined;
    type: 'point' | 'percentage' | 'basic';
}

const convertMeasureToPercent = (
    measure: number | undefined,
    type: 'point' | 'percentage' | 'basic'
): number => {
    if (!measure) {
        return 0;
    }

    if (type === 'percentage') {
        return measure;
    }

    if (type === 'basic') {
        return (measure / 100_000) * 100;
    }

    return 100 - (measure - 1) * 20;
};

const GradeGraph = ({ measure, type }: Props): ReactElement => {
    return (
        <div className="GradeGraph">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`GradeGraph__block`} />
            ))}
            <div className={`GradeGraph__bar`}>
                <CommitIcon
                    className="point"
                    style={{
                        marginLeft: `calc(${convertMeasureToPercent(measure, type)}% - 8px)`,
                    }}
                />
            </div>
        </div>
    );
};

export default GradeGraph;
