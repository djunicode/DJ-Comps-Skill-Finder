import React, { Component } from 'react';
import '../App.css';
class Header extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header Ellipse">
        <div className="page-header mdl-layout__header mdl-layout__header--scroll">
          <div className="mdl-layout__header-row">
            <span className="page-title mdl-layout-title">
              <img className="page-logo-image" src="../UNCLetters.png" alt="page-logo" />
            </span>
            <div className="page-header-spacer mdl-layout-spacer"></div>
            <div className="page-navigation-container">
              <nav className="page-navigation mdl-navigation">
                <a className="mdl-navigation__link" href="">Home</a>
                <a className="mdl-navigation__link" href="">Find a Mentor</a>
                <a className="mdl-navigation__link" href="">Make a Team</a>
                <a className="mdl-navigation__link" href="">Events</a>
                <a className="mdl-navigation__link" href="">Snoopy<i className="material-icons">person</i></a>
              </nav>
            </div>
            <span className="page-mobile-title mdl-layout-title">
              <img className="page-logo-image" src="../UNCLetters.png" alt="page-logo"/>
            </span>
            <button className="page-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" htmlFor="more-button">
              <a href="#"><li className="mdl-menu__item">Home</li></a>
              <a href="#"><li className="mdl-menu__item">Find A Mentor</li></a>
              <a href="#"><li className="mdl-menu__item">Make a Team</li></a>
              <a href="#"><li className="mdl-menu__item">Update Your Profile</li></a>
              <a href="#"><li className="mdl-menu__item">Logout</li></a>
            </ul>
          </div>
        </div>

        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="description">
          <h1>Hackathons</h1>
          <h3>List of all the upcoming Hackathons</h3>
        </div>
        <br/><br/><br/><br/><br/>
      </div>
    );
  }
}

export default Header;
