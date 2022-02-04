import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation'


const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <Logo />
                <Navigation />
            </nav>
        </header>
    );
};

export default Header;