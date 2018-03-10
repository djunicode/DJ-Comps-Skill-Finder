import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            Rmr:[
                  {
                    name: "ikbal",
                    skill: "ml"
                  },
                  {
                    name: "aakash",
                    skill: "css"
                  }
                ],
            Smr:[
                  {
                    name: "vatsal",
                    skill: "ml"
                  },
                  {
                    name: "aakash",
                    skill: "css"
                  }
                ],
            Prmr:[
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
                ],
            Psmr:[
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
                ],
            Hrmr:[
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
                ],
            Hsmr:[
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
                ]
        };
    }

    render() {
        return (
        	<div>
        	 <form>
        		<center>

              <h3 className="description title">Received mentor requests</h3>
              
              <div className="mdl-grid description">

                {this.state.Rmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                        Accept
                      </a>
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                        Decline
                      </a>
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
                      {obj.name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect pending">
                        Pending
                      </a>
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                        Close
                      </a>
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
              <h3 className="description title">1] Received mentor requests</h3>

              <div className="mdl-grid description">

                {this.state.Prmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <h6 className="tname">
                    {obj.project}
                  </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                        Accept
                      </a>
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                        Decline
                      </a>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/>

              <h3 className="description title">2] Sent mentor requests</h3>

              <div className="mdl-grid description">

                {this.state.Psmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                <h6 className="tname">
                  {obj.project}
                </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect pending">
                        Pending
                      </a>
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                        Close
                      </a>
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
              <h3 className="description title">1] Received mentor requests</h3>

              <div className="mdl-grid description">

                {this.state.Hrmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                  <h6 className="tname">
                    {obj.project}
                  </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect accept">
                        Accept
                      </a>
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                        Decline
                      </a>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <br/>

              <h3 className="description title">2] Sent mentor requests</h3>

              <div className="mdl-grid description">

                {this.state.Hsmr.map(obj =>

                <div className="mdl-cell mdl-cell--3-col">
                <h6 className="tname">
                  {obj.project}
                </h6>
                  <div className="demo-card-square mdl-card mdl-shadow--6dp mdl-card--expand">
                    <h4 className="name">
                      {obj.name}
                    </h4>
                    <div className="mdl-card__supporting-text">
                      {obj.skill}
                    </div>
                    <div className="mdl-card__actions">
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect pending">
                        Pending
                      </a>
                      <a className="mdl-button mdl-js-button mdl-js-ripple-effect decline">
                        Close
                      </a>
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
