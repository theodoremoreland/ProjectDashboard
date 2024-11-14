// React
import { ReactElement } from "react";

// Styles
import "./InfiniteScroller.css";

interface Props {
    items: (string | number)[];
}

const InfiniteScroller = ({ items }: Props): ReactElement => {
    const halfwayPoint: number = Math.floor(items.length / 2);
    const firstHalf_Repeated: (string | number)[] = [
        ...items.slice(0, halfwayPoint),
        ...items.slice(0, halfwayPoint),
    ];
    const secondHalf_Repeated: (string | number)[] = [
        ...items.slice(halfwayPoint),
        ...items.slice(halfwayPoint),
    ];

    return (
        <div className="InfiniteScroller">
            <ul className="row left">
                {firstHalf_Repeated.map((item, index) => (
                    <li key={`${item}-${index}`} className="item topic">
                        {item}
                    </li>
                ))}
            </ul>
            <ul className="row right">
                {secondHalf_Repeated.map((item, index) => (
                    <li key={`${item}-${index}`} className="item topic">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InfiniteScroller;
