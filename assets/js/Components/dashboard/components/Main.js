import React, { Component } from 'react';
import '../App.css';
import DjangoCSRFToken from 'django-react-csrftoken';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Mentee:[
            //           {
            //               first_name: "ikbal",
            //               skill: "python",
            //               contact: "9930035998"
            //           },
            //           {
            //               first_name: "aakash",
            //               skill : "c++",
            //               contact: "5955944555"
            //           }
            //        ],
            Mentee: mentees,
            // Mentor:[
            //           {
            //               first_name: "ikbal",
            //               skill: "python",
            //               contact: "9930035998"
            //           },
            //           {
            //               first_name: "aakash",
            //               skill : "c++",
            //               contact: "5955944555"
            //           }
            //        ],
            Mentor: mentors,
/*              Rmr:[
                    {
                      first_name: "ikbal",
                      skill: "ml"
                    },
                    {
                      name: "aakash",
                      skill: "css"
                    }
                  ],*/
            Rmr: mentor_requests_received,
/*              Smr:[
                    {
                      name: "vatsal",
                      skill: "ml"
                    },
                    {
                      name: "aakash",
                      skill: "css"
                    }
                  ],*/
            Smr: mentor_requests_sent,
/*              Prmr:[
                    {
                      project: "Smart India",
                      name: "ikbal",
                      skill: [
                        'python ',
                        'django'
                      ]
                    },
                    {
                      project: "Pythronz",
                      name: "aakash",
                      skill: [
                        'python ',
                        'django'
                      ]
                    }
                  ],*/
            Prmr: project_requests_received,
/*              Psmr:[
                    {
                      project: "India",
                      name: "ikbal",
                      skill: [
                        'python ',
                        'django'
                      ]
                    },
                    {
                      project: "Pythronz",
                      name: "aakash",
                      skill: [
                        'python ',
                        'django'
                      ]
                    }
                  ],*/
            Psmr: project_requests_sent,
/*              Hrmr:[
                    {
                      project: "Smart",
                      name: "ikbal",
                      skill: [
                        'python ',
                        'django'
                      ]
                    },
                    {
                      project: "Pythronz",
                      name: "aakash",
                      skill: [
                        'python ',
                        'django'
                      ]
                    }
                  ],*/
           Hrmr: hackathon_requests_received,
/*              Hsmr:[
                    {
                      project: "Smart India",
                      name: "ikbal",
                      skill: [
                        'python ',
                        'django'
                      ]
                    },
                    {
                      project: "Pythronzzzzzz",
                      name: "aakash",
                      skill: [
                        'python ',
                        'django'
                      ]
                    }
                  ]*/
           Hsmr: hackathon_requests_sent,
        };
    }

    render() {
        return (
        	<div>
        	 <form>
        		<center>

              <h3 className="description title">Your Mentees</h3>

              <div className="mdl-grid description">

                {this.state.Mentee.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.first_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                      <br/><br/>
                      {obj.email}
                    </div>
                    <div className="mdl-card__actions">
                          <form action={"/profile/" + obj.sap_id + "/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                              Profile
                            </button>
                          </form>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/><br/>

              <hr/>

              <br/>

              <h3 className="description title">Your Mentors</h3>

              <div className="mdl-grid description">

                {this.state.Mentor.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.first_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                      <br/><br/>
                      {obj.email}
                    </div>
                    <div className="mdl-card__actions">
                          <form action={"/profile/" + obj.sap_id + "/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                              Profile
                            </button>
                          </form>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/><br/>

              <hr/>

              <br/>

              <h3 className="description title">Received mentor requests</h3>

              <div className="mdl-grid description">

                {this.state.Rmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.first_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/requests/" + obj.request_id + "/accept/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                              Accept
                            </button>
                          </form>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/requests/" + obj.request_id + "/reject/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                              Decline
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/><br/>

              <hr/>

              <br/>
              <h3 className="description title">Sent mentor requests</h3>

              <div className="mdl-grid description">

                {this.state.Smr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.first_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action="" method="">
                          <DjangoCSRFToken />
                            <a className="mdl-button mdl-js-button mdl-js-ripple-effect pending">
                              Pending
                            </a>
                          </form>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/requests/" + obj.request_id + "/cancel/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/><br/>

              <hr/>

              <br/>

              <h2 className="description title">Project team requests</h2>
              <br/>
              <h3 className="description title">1] Received requests</h3>

              <div className="mdl-grid description">

                {this.state.Prmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <h6 className="tname">
                    {obj.project_name}
                  </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.sender_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skills}
                    </div>
                    <div className="mdl-card__actions">
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/projects/teams/request/" + obj.id + "/accept/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                              Accept
                            </button>
                          </form>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/projects/teams/request/" + obj.id + "/reject/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                              Decline
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/>

              <h3 className="description title">2] Sent requests</h3>

              <div className="mdl-grid description">

                {this.state.Psmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                <h6 className="tname">
                  {obj.project_name}
                </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.leader_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skills}
                    </div>
                    <div className="mdl-card__actions">
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action="" method="">
                          <DjangoCSRFToken />
                            <a className="mdl-button mdl-js-button mdl-js-ripple-effect pending">
                              Pending
                            </a>
                          </form>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/projects/teams/request/" + obj.id + "/cancel/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/><br/>

              <hr/>

              <br/>

              <h2 className="description title">Hackathon team requests</h2>
              <br/>
              <h3 className="description title">1] Received requests</h3>

              <div className="mdl-grid description">

                {this.state.Hrmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <h6 className="tname">
                    {obj.hackathon_name}
                  </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.sender_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skills}
                    </div>
                    <div className="mdl-card__actions">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/hackathons/teams/request/" + obj.id + "/accept/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                              Accept
                            </button>
                          </form>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/hackathons/teams/request/" + obj.id + "/reject/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                              Decline
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/>

              <h3 className="description title">2] Sent requests</h3>

              <div className="mdl-grid description">

                {this.state.Hsmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                <h6 className="tname">
                  {obj.hackathon_name}
                </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.leader_name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skills}
                    </div>
                    <div className="mdl-card__actions">
                      <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action="" method="">
                          <DjangoCSRFToken />
                            <a className="mdl-button mdl-js-button mdl-js-ripple-effect pending">
                              Pending
                            </a>
                          </form>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                          <form action={"/hackathons/teams/request/" + obj.id + "/cancel/"} method="post">
                            <DjangoCSRFToken />
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

				    </center>
			     </form>
        	</div>
       	);
    }
}

export default Main;
