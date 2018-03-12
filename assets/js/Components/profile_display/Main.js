import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            skill1: props.skill1,
            skill2: props.skill2,
            skill3: props.skill3,
            interest1: props.interest1,
            interest2: props.interest2,
            interest3: props.interest3,
        };
    }
    componentDidMount(){
      //axios.get('')
      //.then(response => this.setState({"skill1" : response.data.skill1, "skill2" : response.data.skill2, "skill3" : response.data.skill3, "interest1" : response.data.interest1, "interest2" : response.data.interest2, "interest3" : response.data.interest3}))
    }
    componentDidUpdate(){
      //axios.get('')
      //.then(response => this.setState({"skill1" : response.data.skill1, "skill2" : response.data.skill2, "skill3" : response.data.skill3, "interest1" : response.data.interest1, "interest2" : response.data.interest2, "interest3" : response.data.interest3}))
    }
    render() {
        return (
        	<div>
        	<form>
            {/*	<a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a> */}
            <br/>
             <div>
             {/* <a href="{user.behance_url}"><img align="right" className= "images" src="/static/profile_display/beh.png" alt="behance_url"/></a>
            */}  <a href={user.stack_url}><img align="right" className= "images" src="/static/profile_display/sof.png" alt="stack_url"/></a>
                <a href={user.twitter_url}><img align="right" className= "images" src="/static/profile_display/twitter.png" alt="twitter_url"/></a>
                <a href={user.github_url}><img align="right" className= "images" src="/static/profile_display/github.png" alt="github_url"/></a>
                <a href={user.linkedin_url}><img align="right" className= "images" src="/static/profile_display/linkedin.png" alt="linkedin_url"/></a>
            </div>
        		<center>
            <br/><br/><br/>
        		<div className="header">
					<h2>SKILLS</h2>
				</div>
				<br/>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col skills-chips">
            <span className="mdl-chip">
              <span  style ={{"font-size":"30px"}} className="mdl-chip__text">{props.skill1}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col skills-chips ">
            <span className="mdl-chip">
            // I have no idea why this.state is not working. Someone else can figure it out
              // <span className="mdl-chip__text">{this.state.skill2}</span>
              <span style ={{"font-size":"30px"}} className="mdl-chip__text">{props.skill2}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col skills-chips">
            <span className="mdl-chip">
              <span style ={{"font-size":"30px"}} className="mdl-chip__text">{props.skill3}</span>
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
              <span style ={{"font-size":"30px"}} className="mdl-chip__text">{props.interest1}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col interests-chips ">
            <span className="mdl-chip">
              <span style ={{"font-size":"30px"}} className="mdl-chip__text">{props.interest2}</span>
            </span>
          </div>
          <div className="mdl-cell mdl-cell--4-col interests-chips">
            <span className="mdl-chip">
              <span style ={{"font-size":"30px"}} className="mdl-chip__text">{props.interest3}</span>
            </span>
          </div>
       </div>

        <br/><br/><br/><br/>

                {/*<div className="header">
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
        </div>*/}

				</center>
			</form>
        	</div>
       	);
    }
}

export default Main;
