import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
    render() {
        return (
        	<div>
        		<a href="" className="profile-view"><i className="material-icons">keyboard_arrow_left</i>Profile View</a>
        		<br/><br/><br/><br/><br/><br/><br/><br/>
        		<form>
		      		<span className="mdl-selectfield mdl-js-selectfield">
			            <label className="mdl-selectfield__label" for="year-field">Year</label>&nbsp;&nbsp;
			        	<select className="mdl-selectfield__select" id="year-field" name="year">
				          	<option value="option1">option 1</option>
				          	<option value="option2">option 2</option>
				          	<option value="option3">option 3</option>
			        	</select>
			        </span>						   
			        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        <span className="mdl-selectfield mdl-js-selectfield">
			        	<label className="mdl-selectfield__label" for="sap-id">SAP ID</label>&nbsp;&nbsp;&nbsp;
						<input className="mdl-selectfield__select" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sap-id" />
						<span className="mdl-textfield__error">Input is not a number!</span>
					</span>
    			</form>
    			<br/><br/><br/><br/><br/>
				<div className="skills">
					<h1>SKILLS</h1>	
					<p>Got bragging rights?<br/>Fill in your skills.</p>
				</div><br/>
				<form>
		      		<div className="mdl-selectfield mdl-js-selectfield">
			            <label className="skill-label mdl-selectfield__label" for="skill1">SKILL 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        	<select className="skill-select mdl-selectfield__select" id="skill1" name="year">
				          	<option value="option1">HTML</option>
				          	<option value="option2">CSS</option>
				          	<option value="option3">Javascript</option>
			        	</select>
			        </div>
			        <br/><br/><br/>
		      		<div className="mdl-selectfield mdl-js-selectfield">
			            <label className="skill-label mdl-selectfield__label" for="skill2">SKILL 2</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        	<select className="skill-select mdl-selectfield__select" id="skill2" name="year">
				          	<option value="option1">CSS</option>
				          	<option value="option2">HTML</option>
				          	<option value="option3">Javascript</option>
			        	</select>
			        </div>
			        <br/><br/><br/>
			       	<div className="mdl-selectfield mdl-js-selectfield">
			            <label className="skill-label mdl-selectfield__label" for="skill3">SKILL 3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        	<select className="skill-select mdl-selectfield__select" id="skill3" name="year">
				          	<option value="option1">Javascript</option>
				          	<option value="option2">CSS</option>
				          	<option value="option3">HTML</option>
			        	</select>
			        </div>
			    </form>			
				<br/><br/><br/><br/><br/>
				<div className="interests">
					<h1>INTERESTS</h1>	
					<p>Curiosity never kills the cat.<br/>Fill in your interests.</p>
				</div><br/>
				<form>
		      		<div className="mdl-selectfield mdl-js-selectfield">
			            <label className="interest-label mdl-selectfield__label" for="interest1">INTEREST 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        	<select className="interest-select mdl-selectfield__select" id="interest1" name="year">
				          	<option value="option1">Django</option>
				          	<option value="option2">Python</option>
				          	<option value="option3">PHP</option>
			        	</select>
			        </div>
			        <br/><br/><br/>
		      		<div className="mdl-selectfield mdl-js-selectfield">
			            <label className="interest-label mdl-selectfield__label" for="interest2">INTEREST 2</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        	<select className="interest-select mdl-selectfield__select" id="interest2" name="year">
				          	<option value="option1">Python</option>
				          	<option value="option2">PHP</option>
				          	<option value="option3">Django</option>
			        	</select>
			        </div>
			        <br/><br/><br/>
			       	<div className="mdl-selectfield mdl-js-selectfield">
			            <label className="interest-label mdl-selectfield__label" for="interest3">INTEREST 3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        	<select className="interest-select mdl-selectfield__select" id="interest3" name="year">
				          	<option value="option1">PHP</option>
				          	<option value="option2">Python</option>
				          	<option value="option3">Django</option>
			        	</select>
			        </div>
			    </form>							
				<br/><br/><br/><br/><br/>
				<div className="profile">
					<h1>PROFILE LINKS</h1>
					<br/><br/>	
					<label for="linkedln" className="mdl-selectfield__label">Linkedln</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="linkedln" id="linkedln" /><br/><br/><br/>
					<label for="github" className="mdl-selectfield__label">Github</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="github" id="github" /><br/><br/><br/>	
					<label for="twitter" className="mdl-selectfield__label">Twitter</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="twitter" id="twitter" /><br/><br/><br/>
					<label for="behance" className="mdl-selectfield__label">Behance</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="behance" id="behance" /><br/>	
				</div>
        	</div>
       	);
    }
}

export default Main;
