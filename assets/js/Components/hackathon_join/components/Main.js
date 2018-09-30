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
            sentRequests: requests_sent,
            // recievedRequests:['Avais',
            //             'Rudhresh',
            //             'Swapneel',
            //           ],
            recievedRequests: requests_received,
            // availableProjects:[
            //                     {
            //                         teamName: "Test Project 1",
            //                         Hackathon: "SmartIndia",
            //                         teamMembers: [
            //                           'Member 1',
            //                           'Member 2'
            //                         ],
            //                         description:"Test description",
            //                         skillsRequired: [
            //                           'Skill 1',
            //                           'Skill 2'
            //                         ],
            //                     },
            //                     {
            //                         teamName: "Test Project 1",
            //                         Hackathon: "SmartIndia",
            //                         teamMembers: [
            //                           'Member 1',
            //                           'Member 2'
            //                         ],
            //                         description:"Test description",
            //                         skillsRequired: [
            //                           'Skill 1',
            //                           'Skill 2'
            //                         ],
            //                     }
            //
            //                   ]
            availableProjects: teams


        };
    }
    render() {
        return (
        	<div>

            <center>
              <h1 className="title">Join a Hackathon Team</h1>
              <br/><br/><br/>
              <div className="main-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
              <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Sent Requests</span>
                <nav className="mdl-navigation">
                  {this.state.sentRequests.map(obj =>
                    <a className="mdl-navigation__link" href="">{obj.leader_name}</a>
                  )}
                </nav>
                <br/><br/>
                <span className="mdl-layout-title">Received Requests</span>
                <nav className="mdl-navigation">
                  {this.state.recievedRequests.map(obj =>
                    <a className="mdl-navigation__link" href="">{obj.sender_name}</a>
                  )}
                </nav>
              </div>
              <main className="mdl-layout__content">
              <div className="page-content">
                <div className="mdl-grid">
                  {this.state.availableProjects.map(obj2 =>
                  <div className="medium-card mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--4dp">
                    <div className = "mdl-card__title">
                      <h1 className = "mdl-card__title-text">{obj2.name}</h1>
                    </div>
                    <div className="mdl-card__subtitle-text">
                      <h5>{list_hack[obj2.hackathon]}</h5>
                      <p>{obj2.current_members.map(member => <span>{member} </span> )}</p>
                    </div>
                    <div className = "mdl-card__supporting-text">
                      <div className="header">
                        <h5>Description</h5>
                        <p>{obj2.description}</p>
                      </div>
                      <div className="header">
                        <h5>Skills required</h5>
                        <p>{obj2.skills_required.map(skill => <span>{skill} </span> )}</p>
                      </div>
                    </div>
                    <form action={"/hackathons/teams/" + obj2.id + "/request/"} method="post">
                    <DjangoCSRFToken />
                    <div className = "mdl-card__actions">
                       <button type="submit" disabled={obj2.disabled} className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Join
                       </button>
                    </div>
                     </form>
                  </div>)}

            </div>
              </div>
              </main>
            </div>
            </center>

        	</div>
       	);
    }
}

export default Main;
