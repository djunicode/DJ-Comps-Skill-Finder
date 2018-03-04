import React, { Component } from 'react';
import '../App.css';
class Footer extends Component {
    render() {
        return (
            <div>
                <img src="../approach-illustration-3.png" className="footerimage" />
                <footer className="page-footer mdl-mega-footer">
                    <div className="mdl-mega-footer--top-section">
                        <div className="mdl-mega-footer--left-section">

                        </div>
                        <div className="mdl-mega-footer--right-section">
                            <a className="mdl-typography--font-light" href="#top">
                                Back to Top
                                <i className="material-icons">expand_less</i>
                            </a>
                        </div>
                    </div>

                    <div className="mdl-mega-footer--middle-section">
                        <p className="mdl-typography--font-light">Some text would go here</p>
                        <p className="mdl-typography--font-light">Some text can go here too</p>
                    </div>

                    <div className="mdl-mega-footer--bottom-section">
                        <a className="page-link page-link-menu mdl-typography--font-light" id="version-dropdown">
                            PlaceHolder
                            <i className="material-icons">arrow_drop_up</i>
                        </a>
                        <ul className="mdl-menu mdl-js-menu mdl-menu--top-left mdl-js-ripple-effect" htmlFor="version-dropdown">
                            <li className="mdl-menu__item">PlaceHolder</li>
                            <li className="mdl-menu__item">PlaceHolder</li>
                            <li className="mdl-menu__item">PlaceHolder</li>
                            <li className="mdl-menu__item">PlaceHolder</li>
                        </ul>
                        <a className="page-link page-link-menu mdl-typography--font-light" id="developers-dropdown">
                            PlaceHolder
                            <i className="material-icons">arrow_drop_up</i>
                        </a>
                        <ul className="mdl-menu mdl-js-menu mdl-menu--top-left mdl-js-ripple-effect" htmlFor="developers-dropdown">
                            <li className="mdl-menu__item">PlaceHolder</li>
                            <li className="mdl-menu__item">PlaceHolder</li>
                            <li className="mdl-menu__item">PlaceHolder</li>
                            <li className="mdl-menu__item">PlaceHolder</li>
                        </ul>
                        <a className="page-link mdl-typography--font-light" href="">PlaceHolder</a>
                        <a className="page-link mdl-typography--font-light" href="">PlaceHolder</a>
                    </div>


                </footer>
            </div>

        );
    }
}

export default Footer;
