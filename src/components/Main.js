import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
    render() {
        return (
		<div className="main-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
			<div className="mdl-layout__drawer">
			    <span className="mdl-layout-title">Sent Requests</span>
			    <nav className="mdl-navigation">
			      <a className="mdl-navigation__link" href="">Charlie Brown</a>
			      <a className="mdl-navigation__link" href="">Peppermint Paty</a>
			      <a className="mdl-navigation__link" href="">Lucy Van Pelt</a>
			    </nav>
			    <span className="mdl-layout-title">Received Requests</span>
			    <nav className="mdl-navigation">
			      <a className="mdl-navigation__link" href="">Woodstack</a>
			      <a className="mdl-navigation__link" href="">Snoopy</a>
			    </nav>
			</div>
			<main className="mdl-layout__content">
			<div className="page-content">
				<div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
					<label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
					  <i className="material-icons">search</i>
					</label>
					<div className="mdl-textfield__expandable-holder">
					  <input className="mdl-textfield__input" type="text" id="search" />
					  <label className="mdl-textfield__label" htmlFor="search">Search</label>
					</div>
				</div>
				<a className="clear-tag mdl-navigation__link" href="">Year: TE<i className="material-icons">clear</i></a>
				<div className="mdl-grid">
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>&nbsp;&nbsp;&nbsp;
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>&nbsp;&nbsp;&nbsp;
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>&nbsp;&nbsp;&nbsp;					
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>&nbsp;&nbsp;&nbsp;
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>&nbsp;&nbsp;&nbsp;
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>&nbsp;&nbsp;&nbsp;
					<div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
						<figure className="mdl-card__media">
							<img src="profile.png" alt="profile photo" />
						</figure>
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Sally Brown</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<p>Mentor Skills.</p>
						</div>
						<div className="mdl-card__actions mdl-card--border">
							<a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
							<div className="mdl-layout-spacer"></div>
							<a className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</a>
						</div>
					</div>
				</div>
			</div>
			</main>
		</div>	
       	);
    }
}

export default Main;
