// React
import { ReactElement } from "react";

// Styles
import "./InfiniteScroller.css";

interface Props {
    items: (string | number)[];
}

const InfiniteScroller = ({ items }: Props): ReactElement => {
    const halfwayPoint: number = Math.floor(items.length / 2);
    const firstHalf: (string | number)[] = items.slice(0, halfwayPoint);
    const secondHalf: (string | number)[] = items.slice(halfwayPoint);

    return (
        <div className="InfiniteScroller">
            <div className="row">
                {firstHalf.map((item, index) => (
                    <span key={index} className="item">
                        {item}
                    </span>
                ))}
            </div>
            <div className="row">
                {secondHalf.map((item, index) => (
                    <span key={index} className="item">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default InfiniteScroller;
