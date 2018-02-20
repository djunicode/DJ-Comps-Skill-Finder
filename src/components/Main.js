import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            skill1:'Skill1',
            skill2:'Skill2',
            skill3:'Skill3',
            interest1: 'Interest1',
            interest2: 'Interest2',
            interest3:'Interest3'
        };
    }
    componentDidMount(){
      axios.get('')
      .then(response => this.setState({skill: response.data.skill}))
    }
    componentDidUpdate(){
      axios.get('')
      .then(response => this.setState({skill: response.data.skill}))
    }
    render() {
        return (
        	<div>
        	<form>
        		<a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
        		<br/><br/>
        		<center>
        		<div className="header">
					<h2>SKILLS</h2>
				</div>
				<br/>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col skills-chips">
            <span className="mdl-chip">
              <span className="mdl-chip__text">{this.state.skill1}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col skills-chips ">
            <span className="mdl-chip">
              <span className="mdl-chip__text">{this.state.skill2}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col skills-chips">
            <span className="mdl-chip">
              <span className="mdl-chip__text">{this.state.skill3}</span>
            </span>
          </div>
       </div>
       <br/><br/><br/><br/>
			 <div className="header">
					<h2>INTERESTS</h2>
				</div>
				<br/>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col interests-chips">
            <span className="mdl-chip">
              <span className="mdl-chip__text">{this.state.interest1}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col interests-chips ">
            <span className="mdl-chip">
              <span className="mdl-chip__text">{this.state.interest2}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col interests-chips">
            <span className="mdl-chip">
              <span className="mdl-chip__text">{this.state.interest3}</span>
            </span>
          </div>
       </div>

        <br/><br/><br/><br/>

				<div className="header">
					<h2>PROJECT LINKS</h2>
				</div>
				<br/>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col first-link">
            <label>SkillFinder Web App</label>
            <br/><br/>
            <p>Project description</p>
            <br/>
            <a href="">https:/wwwfigmacom/file/aQlFq3vEmQo1B70zBf1031k</a>
          </div>
          <div className="mdl-cell mdl-cell--6-col second-link">
            <label>SkillFinder Web App</label>
            <br/><br/>
            <p>Project description</p>
            <br/>
            <a href="">https:/wwwfigmacom/file/aQlFq3vEmQo1B70zBf1031k</a>
          </div>
        </div>

				</center>
			</form>
        	</div>
       	);
    }
}

export default Main;
