import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
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
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text join">
                   Join
                  </button>
                  &nbsp;&nbsp;
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text create">
                   Create
                  </button>
                </div>
                <div className="mdl-cell mdl-cell--6-col align">
                  <img className="teamwork" src="../teamwork.jpg" alt="teamwork"/>
                </div>
              </div>
              <br/><br/><br/>
              <div className="mdl-grid align">
                <div className="mdl-cell mdl-cell--6-col align">
                  <img className="hack" src="../Hackathon.png" alt="hackathon"/>
                </div>
                <div className="mdl-cell mdl-cell--6-col align">
                  <h1 className="descripton title">Hackathons</h1>
                  <h5 className="text">Join or create teams to particiate in hackathons.</h5>
                  <br/>
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text join">
                   Join
                  </button>
                  &nbsp;&nbsp;
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect descripton text create">
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
