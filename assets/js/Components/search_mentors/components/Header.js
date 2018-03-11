import React, { Component } from 'react';
import '../App.css';
class Header extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header Ellipse">
        <div className="page-header mdl-layout__header mdl-layout__header--scroll">
          <div className="mdl-layout__header-row">
            <span className="page-title mdl-layout-title">
              <img className="page-logo-image" src="/static/profile_updation/UNCLetters.png" alt="page-logo" />
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
                <a className="mdl-navigation__link" href="/dashboard/">Home</a>
                <a className="mdl-navigation__link" href="/search/">Find a Mentor</a>
                <a className="mdl-navigation__link" href="/teams/">Make a Team</a>
                <a className="mdl-navigation__link" href="">Events</a>
                <a className="mdl-navigation__link" href={"/profile/" + user.sap_id + "/"}>{user.first_name}<i className="material-icons">person</i></a>
              </nav>
            </div>
            <span className="page-mobile-title mdl-layout-title">
              <img className="page-logo-image" src="/static/profile_updation/UNCLetters.png" alt="page-logo"/>
            </span>
            <button className="page-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" htmlFor="more-button">
              <li className="mdl-menu__item"><a href="/dashboard/">Home</a></li>
              <li className="mdl-menu__item"><a href="/search/">Find A Mentor</a></li>
              <li className="mdl-menu__item"><a href="/teams/">Make a Team</a></li>
              <li className="mdl-menu__item"><a href="/profile/update">Update Your Profile</a></li>
              <li className="mdl-menu__item"><a href="/logout/">Logout</a></li>
            </ul>
          </div>
        </div>
        <br/><br/><br/><br/><br/>
        <h1>Mentors</h1>
        <br/><br/><br/><br/>
      </div>
    );
  }
}

export default Header;
