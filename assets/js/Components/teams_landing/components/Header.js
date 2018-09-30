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
              <a href="/dashboard/"><li className="mdl-menu__item">Home</li></a>
              <a href="/search/"><li className="mdl-menu__item">Find A Mentor</li></a>
              <a href="/teams/"><li className="mdl-menu__item">Make a Team</li></a>
              <a href="/profile/update"><li className="mdl-menu__item">Update Your Profile</li></a>
              <a href="/logout/"><li className="mdl-menu__item">Logout</li></a>
            </ul>
          </div>
        </div>

        <br/><br/><br/><br/>
        <div className="description">
          <h1>Teams</h1>
          <h5>Make a team or join one!</h5>
        </div>
        <br/><br/><br/>
      </div>
    );
  }
}

export default Header;
