import React, { Component } from 'react';
import '../App.css';
import DjangoCSRFToken from 'django-react-csrftoken';

class Main extends Component {
  constructor(props){
        super(props);
        this.state = {
            // sentRequests:['Krisha',
            //             'Ikbal',
            //             'Vatsal',
            //             'Aakash',
            //           ],
            // recievedRequests:['Avais',
            //             'Rudhresh',
            //             'Swapneel',
            //           ],
            sentRequests: sent,
            recievedRequests: received,
            availableSEMentors: second,
            availableTEMentors: third,
            SEMentors: false,
            TEMentors: true,


        };
        this.findCurrentMentor = this.findCurrentMentor.bind(this);
        this.handleSEMentor = this.handleSEMentor.bind(this);
        this.handleTEMentor = this.handleTEMentor.bind(this);
    }
    findCurrentMentor(){
      if(this.state.TEMentors == true){
        return <div>TE</div>
      }
      if(this.state.SEMentors == true){
        return <div>SE</div>
      }
    }
    handleSEMentor(event){
      this.setState({
        SEMentors: !this.state.SEMentors
      });

    }
    handleTEMentor(event){
      this.setState({
        TEMentors: !this.state.TEMentors,
          SEMentors: !this.state.SEMentors
      });

    }


    render() {
      let Mentors = null;
      if (this.state.SEMentors == true) {
        Mentors =
        this.state.availableSEMentors.map(obj =>
        <div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
          <figure className="mdl-card__media">
            <img src={obj.photo} alt="profile photo" />
          </figure>
          <div className="mdl-card__title">
            <h1 className="mdl-card__title-text">{obj.first_name}</h1>
          </div>
          <div className="mdl-card__supporting-text">
            <p>Mentor Skills.</p>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
            <div className="mdl-layout-spacer"></div>
            <form action={"/site/requests/" + obj.sap_id + "/"} method="post">
            <DjangoCSRFToken />
            <button type="submit" className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</button>
            </form>
          </div>
        </div>
      );
      }
      if(this.state.TEMentors == true) {
        Mentors =
        this.state.availableTEMentors.map(obj =>
        <div className="mdl-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-shadow--2dp">
          <figure className="mdl-card__media">
            <img src={obj.photo} alt="profile photo" />
          </figure>
          <div className="mdl-card__title">
            <h1 className="mdl-card__title-text">{obj.first_name}</h1>
          </div>
          <div className="mdl-card__supporting-text">
            <p>Mentor Skills.</p>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a className="profile-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Profile</a>
            <div className="mdl-layout-spacer"></div>
            <form action={"/site/requests/" + obj.sap_id + "/"} method="post">
            <DjangoCSRFToken />
            <button type="submit" className="request-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Send Request</button>
            </form>
          </div>
        </div>
      );

}
        return (

		<div className="main-layout mdl-js-layout mdl-layout--fixed-drawer">
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Sent Requests</span>
        <nav className="mdl-navigation">
             {this.state.sentRequests.map(obj =>
          <div className="mdl-grid">
          <div className="mdl-cell--8-col">
           <a className=" mdl-navigation__link" href="">{obj.first_name}</a>
           </div>
           <div className="mdl-cell--4-col">
           <form action={"/site/requests/" + obj.request_id + "/cancel/"} method="post">
           <DjangoCSRFToken />
          <button className="requests-button mdl-button mdl-js-button">
          Cancel
          </button>
          </form>
          </div>
           </div>
         )}
          </nav>
          <br/>
        <span className="mdl-layout-title">Received Requests</span>
        <nav className="mdl-navigation">
               {this.state.recievedRequests.map(obj =>
          <div className="mdl-grid">
            <div className="mdl-cell--4-col">
             <a className="mdl-navigation__link" href="">{obj.first_name}</a>
           </div>
           <div className="requests mdl-cell--8-col">
           <form action={"/site/requests/" + obj.request_id + "/accept/"} method="post">
           <DjangoCSRFToken />
          <button className="accept-button mdl-button mdl-js-button">
            Accept
          </button>
          </form>
          <form action={"/site/requests/" + obj.request_id + "/reject/"} method="post">
          <DjangoCSRFToken />
          <button className="decline-button mdl-button mdl-js-button">
            Decline
          </button>
          </form>
          </div>
        </div>
           )}
        </nav>
      </div>

			<main className="mdl-layout__content">
			<div className="page-content">


        <form method="get">
        <button type="submit" className="search-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          SEARCH
        </button>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
					<label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
					  <i className="material-icons">search</i>
					</label>
					<div className="mdl-textfield__expandable-holder">
					  <input className="mdl-textfield__input" type="text" id="search" name="skill"/>
					  <label className="mdl-textfield__label" htmlFor="search">Search</label>
					</div>
        </div>
        </form>
            <div>
              <button className="clear-tag mdl-navigation__link" onClick={this.handleTEMentor}>Switch Years</button>
            </div>
        <br/><br/><br/>
				<div className="mdl-grid">
          {Mentors}
        </div>
					</div>
          	</main>
				</div>



       	);
    }
}

export default Main;
