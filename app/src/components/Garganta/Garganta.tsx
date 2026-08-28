// React
import { ReactElement } from 'react';

// Styles
import './Garganta.css';

const Garganta = (): ReactElement => {
    return (
        <div className="Garganta">
            {Array.from({ length: 18 }).map((_, index) => (
                <div key={index} className="Garganta__line" />
            ))}
        </div>
    );
};

export default Garganta;
