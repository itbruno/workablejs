import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';

class HeaderNav extends Component {
    render() {
        return (
            <div className="header-nav">
                <a href="/" className="header-logo">
                    <img src={logo} className="img-responsive" alt="MyWork logo"/>
                </a>

                <nav>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                </nav>
            </div>
        )
    }
}

export default HeaderNav;