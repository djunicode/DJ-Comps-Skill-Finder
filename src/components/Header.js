import React, { Component } from 'react';
import '../App.css';
class Header extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <div className="page-header mdl-layout__header mdl-layout__header--waterfall">
          <div className="mdl-layout__header-row">
            <span className="page-title mdl-layout-title">
              <img className="page-logo-image" src="../UNCLetters.png" />
            </span>
            <div className="page-header-spacer mdl-layout-spacer"></div>
            <div className="page-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search-field">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search-field" />
              </div>
            </div>
            <div className="page-navigation-container">
              <nav className="page-navigation mdl-navigation">
                <a className="mdl-navigation__link mdl-typography--text-uppercase" href="">PlaceHolder</a>
                <a className="mdl-navigation__link mdl-typography--text-uppercase" href="">PlaceHolder</a>
                <a className="mdl-navigation__link mdl-typography--text-uppercase" href="">PlaceHolder</a>
              </nav>
            </div>
            <span className="page-mobile-title mdl-layout-title">
              <img className="page-logo-image" src="../UNCLetters.png" />
            </span>

            <button className="page-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" htmlFor="more-button">
              <li className="mdl-menu__item">PlaceHolder</li>
              <li className="mdl-menu__item">PlaceHolder</li>
              <li disabled className="mdl-menu__item">PlaceHolder</li>
              <li className="mdl-menu__item">PlaceHolder</li>
            </ul>

          </div>
        </div>
        <div className="page-drawer mdl-layout__drawer">
          <span className="mdl-layout-title">
            <img className="page-logo-image" src="../UNCLetters.png" />
          </span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">PlaceHolder 1</a>
            <a className="mdl-navigation__link" href="">PlaceHolder 2</a>
            <a className="mdl-navigation__link" href="">PlaceHolder 3</a>
            <a className="mdl-navigation__link" href="">PlaceHolder 4</a>
            <div className="page-drawer-separator"></div>
            <span className="mdl-navigation__link" href="">PlaceHolder</span>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <div className="page-drawer-separator"></div>
            <span className="mdl-navigation__link" href="">PlaceHolder</span>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <div className="page-drawer-separator"></div>
            <span className="mdl-navigation__link" href="">PlaceHolder</span>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
            <a className="mdl-navigation__link" href="">PlaceHolder</a>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
