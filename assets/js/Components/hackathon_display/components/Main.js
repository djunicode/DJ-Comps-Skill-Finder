import React, { Component } from 'react';
import '../App.css';

class Main extends Component {
  constructor(props){
        super(props);
        this.state = {
            hackathons: hackathons
                              /*[
                                {
                                    name: "Test Hack 1",
                                    date: "28/02/18",
                                    description:"Test description",
                                    url:"www.google.com"
                                },
                                {
                                    name: "Test Hack 2",
                                    date: "20/04/18",
                                    description:"Test description",
                                    url:"www.gmail.com"
                                }
                              ]*/
        };
    }

    handleHackathonAdd(event){
    event.preventDefault();
    window.location.href = '/hackathons/add/';
    }

    handleHackathonTeamJoin(event){
    event.preventDefault();
    window.location.href = '/hackathons/teams/';
    }

    render() {
        return (
        	<div>
            <form>
            <center>
              <br/>
              <div className="page-content">
                <br/>
                <span>
                  <button className="mdl-button button-1 mdl-js-button mdl-js-ripple-effect" onClick={this.handleHackathonAdd}>
                    Add a Hackathon
                  </button>
                  <button className="mdl-button button-2 mdl-js-button mdl-js-ripple-effect">
                    Join teams
                  </button>              
                </span>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <div className="mdl-grid">
                  {this.state.hackathons.map(obj2 =>
                  <div className="medium-card mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--4dp">
                    <div className = "mdl-card__title">
                      <h1 className = "mdl-card__title-text">{obj2.name}</h1>
                    </div>
                    <div className="mdl-card__subtitle-text">
                      <h5>{obj2.date}</h5>
                    </div>
                    <div className = "mdl-card__supporting-text">
                      <div className="header">
                        <h5>Description</h5>
                        <p>{obj2.description}</p>
                      </div>
                      <br/><br/>
                      <div className="header">
                        <a className="details" href={"//" + obj2.url} target="_blank">For details click here</a>
                      </div>
                    </div>
                    <br/>
                    <div className = "mdl-card__actions">
                       <a className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Join teams
                       </a>
                    </div>
                  </div>)}
                </div>
              </div>
            </center>
		        </form>
        	</div>
       	);
    }
}

export default Main;
