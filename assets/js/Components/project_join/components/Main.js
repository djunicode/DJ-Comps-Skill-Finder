import React, { Component } from 'react';
import '../App.css';
import DjangoCSRFToken from 'django-react-csrftoken';

class Main extends Component {
  constructor(props){
        super(props);
        this.state = {
            /*sentRequests:['Krisha',
                        'Ikbal',
                        'Vatsal',
                        'Aakash',
                      ],
            receivedRequests:['Avais',
                        'Rudhresh',
                        'Swapneel',
                      ],*/
            sentRequests: sent || ['None'],
            receivedRequests: received || ['None'],
            //availableProjects:[
            //                    {
            //                        teamName: "Test Project 1",
            //                        Hackathon: "SmartIndia",
            //                        teamMembers: [
            //                          'Member 1',
            //                          'Member 2'
            //                        ],
            //                        description:"Test description",
            //                        skillsRequired: [
            //                          'Skill 1',
            //                          'Skill 2'
            //                        ],
            //                    },
            //                    {
            //                        teamName: "Test Project 1",
            //                        Hackathon: "SmartIndia",
            //                        teamMembers: [
            //                          'Member 1',
            //                          'Member 2'
            //                        ],
            //                        description:"Test description",
            //                        skillsRequired: [
            //                          'Skill 1',
            //                          'Skill 2'
            //                        ],
            //                    }
            //
            //                  ]
            availableProjects: teams

        };
    }
    render() {
        return (
        	<div>
            <form>
            <center>
              <h1 className="title">Join a Project Team</h1>
              <br/><br/><br/>
              <div className="main-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
              <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Sent Requests</span>
                <nav className="mdl-navigation">
                  {this.state.sentRequests.map(obj =>
                      <a className="mdl-navigation__link" href="">{obj.name}</a>
                    )}
                </nav>
                <br/><br/>
                <span className="mdl-layout-title">Received Requests</span>
                <nav className="mdl-navigation">
                  {this.state.receivedRequests.map(obj =>
                    <a className="mdl-navigation__link" href="">{obj.first_name}</a>
                  )}
                </nav>
              </div>
              <main className="mdl-layout__content">
              <div className="page-content">
                <span>
                  <a href="" className="filter-link"><i className="filter-link material-icons">filter_list</i></a>
                  <a className="clear-tag mdl-navigation__link" href="">Skills: ML<i className="material-icons">clear</i></a>
                </span>
                <br/><br/><br/><br/><br/><br/><br/>
                <div className="mdl-grid">
                  {this.state.availableProjects.map(obj2 =>
                  <div className="medium-card mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--4dp">
                    <div className = "mdl-card__title">
                      <h1 className = "mdl-card__title-text">{obj2.name}</h1>
                    </div>
                    <div className="mdl-card__subtitle-text">
                      <h5>{list_hack[obj2.project]}</h5>
                      <p>{obj2.current_members}</p>
                    </div>
                    <div className = "mdl-card__supporting-text">
                      <div className="header">
                        <h5>Description</h5>
                        <p>{obj2.description}</p>
                      </div>
                      <div className="header">
                        <h5>Skills required</h5>
                        <p>{obj2.skills_required} </p>
                      </div>
                    </div>
                    <form action={"/projects/teams/" + obj2.id + "/request/"} method="post">
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
		        </form>
        	</div>
       	);
    }
}

export default Main;
