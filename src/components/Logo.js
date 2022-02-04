import React from 'react';

import LogoImage from '../assets/tasty.png';

const Logo = () => {
    return (
        <div className="nav__logo">
            <img className="tasty__logo" src={ LogoImage } alt=""/>
        </div>
        );
    };
    
    export default Logo;