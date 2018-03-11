import React, { Component } from 'react';
import '../App.css';
class Main extends Component {

    constructor(props){
        super(props);


        this.handleProjJoin= this.handleProjJoin.bind(this);
        this.handleProjCreate= this.handleProjCreate.bind(this);
        this.handleHackJoin= this.handleHackJoin.bind(this);
        this.handleHackCreate= this.handleHackCreate.bind(this);

    }

    handleProjJoin(event){
      event.preventDefault();
      window.location.href = '/projects/teams/';
    }

    handleProjCreate(event){
      event.preventDefault();
      window.location.href = '/projects/teams/add/';
    }

    handleHackJoin(event){
      event.preventDefault();
      window.location.href = '/hackathons/teams/';
    }

    handleHackCreate(event){
      event.preventDefault();
      window.location.href = '/hackathons/teams/add/';
    }

    render() {
        return (
        	<div>
        	 <form>
        		<center>
              <div className="mdl-grid align">
                <div className="mdl-cell mdl-cell--6-col align">
                  <h1 className="descripton title">Projects</h1>
                  <h5 className="text">Join or create teams to make projects.</h5>
                  <br/>
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text join" onClick={this.handleProjJoin}>
                   Join
                  </button>
                  &nbsp;&nbsp;
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text create" onClick={this.handleProjCreate}>
                   Create
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--6-col align">
                  <img className="teamwork" src="/static/teams_landing/teamwork.jpg" alt="teamwork"/>
                </div>
              </div>
              <br/><br/><br/>
              <div className="mdl-grid align">
                <div className="mdl-cell mdl-cell--6-col align">
                  <img className="hack" src="/static/teams_landing/Hackathon.png" alt="hackathon"/>
                </div>
                <div className="mdl-cell mdl-cell--6-col align">
                  <h1 className="descripton title">Hackathons</h1>
                  <h5 className="text">Join or create teams to particiate in hackathons.</h5>
                  <br/>
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text join" onClick={this.handleHackJoin}>
                   Join
                  </button>
                  &nbsp;&nbsp;
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text create" onClick={this.handleHackCreate}>
                   Create
                  </button>
                </div>
              </div>
				    </center>
			     </form>
        	</div>
       	);
    }
}

export default Main;
