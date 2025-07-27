// React
import { ReactElement } from 'react';

// Images
import Ribbon from '../../assets/images/icons/ribbon.png';

// Styles
import './FeaturedRibbon.css';

const FeaturedRibbon = (): ReactElement => {
    return (
        <div className="FeaturedRibbon">
            <span>Featured</span>
            <img src={Ribbon} alt="" className="FeaturedRibbon__icon" />
        </div>
    );
};

export default FeaturedRibbon;
