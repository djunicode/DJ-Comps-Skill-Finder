import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
    render() {
        return (
        	<div>
        	<form>
        		<a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
        		<br/><br/><br/><br/><br/>   
        		<center>     		
        		<div className="header">
					<h2>SKILLS</h2>
				</div>
				<br/><br/><br/>
				<div className="skills-chips">	
					<span className="mdl-chip">
	    				<span className="mdl-chip__text">HTML</span>
					</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span className="mdl-chip">
						   <span className="mdl-chip__text">CSS</span>
					</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span className="mdl-chip">
						<span className="mdl-chip__text">JavaScript</span>
					</span>
				</div><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<div className="header">
					<h2>INTERESTS</h2>
				</div>
				<br/><br/><br/>
				<div className="interests-chips">	
					<span className="mdl-chip">
	    				<span className="mdl-chip__text">Python</span>
					</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span className="mdl-chip">
						<span className="mdl-chip__text">Django</span>
					</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span className="mdl-chip">
						<span className="mdl-chip__text">PHP</span>
					</span>
				</div><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<div className="header">
					<h2>PROJECT LINKS</h2>
				</div>
				<br/><br/><br/>
				<div className="project-links">
					<div className="first-link">
						<label>SkillFinder Web App</label>
						<br/><br/>
						<p>Project description</p>
						<br/>
						<a href="">https:/wwwfigmacom/file/aQlFq3vEmQo1B70zBf1031k</a>
					</div>
					<br/><br/><br/><br/>
					<div className="second-link">
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
