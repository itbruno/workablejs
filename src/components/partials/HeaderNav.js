import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';

class HeaderNav extends Component {
    render() {
        return (
            <div className="header-nav">
                <a href="/" className="header-logo">
                    <img src={logo} className="img-responsive" alt="MyWork logo"/>
                </a>
            </div>
        )
    }
}

export default HeaderNav;