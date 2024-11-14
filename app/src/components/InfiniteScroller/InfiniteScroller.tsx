// React
import { ReactElement } from "react";

// Styles
import "./InfiniteScroller.css";

interface Props {
    items: (string | number)[];
}

const InfiniteScroller = ({ items }: Props): ReactElement => {
    const halfwayPoint: number = Math.floor(items.length / 2);
    const firstHalf: (string | number)[] = items.slice(0, 17);

    return (
        <div className="InfiniteScroller">
            <div className="row left">
                {firstHalf.map((item) => (
                    <span key={`${item}-1`} className="item topic">
                        {item}
                    </span>
                ))}
                {firstHalf.map((item) => (
                    <span key={`${item}-2`} className="item topic">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default InfiniteScroller;
