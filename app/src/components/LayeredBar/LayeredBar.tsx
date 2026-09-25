// React
import { ReactElement } from 'react';

// Custom
import { convertToPercentage } from './LayeredBar.utils';

// Styles
import './LayeredBar.css';

interface Props {
    className: string;
    topData: {
        label: string;
        value: number;
    };
    bottomData: {
        label: string;
        value: number;
    };
    direction?: 'vertical' | 'horizontal';
}

const LayeredBar = ({
    className,
    topData,
    bottomData,
}: Props): ReactElement => {
    return (
        <div className={`LayeredBar ${className}`}>
            <div className="top legend">
                <span className="color"></span>
                <div className="label-container">
                    <p>{topData.label}</p>
                    <span className="number">{topData.value}</span>
                </div>
            </div>
            <div className="bar-container">
                <span
                    className="top bar"
                    style={{
                        height: convertToPercentage(topData.value || 0, 10_000),
                    }}
                ></span>
                <span
                    className="bottom bar"
                    style={{
                        height: convertToPercentage(
                            bottomData.value || 0,
                            10_000
                        ),
                    }}
                ></span>
            </div>
            <div className="bottom legend">
                <span className="color"></span>
                <div className="label-container">
                    <p>{bottomData.label}</p>
                    <span className="number">{bottomData.value}</span>
                </div>
            </div>
        </div>
    );
};

export default LayeredBar;
