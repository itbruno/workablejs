import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import logoLight from '../../assets/images/logo_light.svg';

class HeaderNav extends Component {
    render() {
        const type = this.props.type;
        return (
            <div className={type + ' header-nav'}>
                <a href="/" className="header-logo">
                    <img src={type === 'light' ? logoLight : logo} className="img-responsive" alt="MyWork logo"/>
                </a>

                <nav>
                    <a href="/">about</a>
                </nav>
            </div>
        )
    }
}

export default HeaderNav;