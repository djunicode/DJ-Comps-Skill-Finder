import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
  constructor(props){
        super(props);
        this.state = {
            linkedIn: '',
            behance:'',
            github:'',
            interest1: '',
            interest2: '',
            interest3:'',
            skill1:'',
            skill2:'',
            skill3:'',
            sapID: '',
            year:'',
            user:'',
        };

        this.handleSAP= this.handleSAP.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleInterest1 = this.handleInterest1.bind(this);
        this.handleInterest2 = this.handleInterest2.bind(this);
        this.handleInterest3 = this.handleInterest3.bind(this);
        this.handleSkill1 = this.handleSkill1.bind(this);
        this.handleSkill2 = this.handleSkill2.bind(this);
        this.handleSkill3 = this.handleSkill3.bind(this);
        this.handleGithub = this.handleGithub.bind(this);
        this.handleLinkedIn = this.handleLinkedIn.bind(this);
        this.handleBehance = this.handleBehance.bind(this);


    }

    handleSAP(event) {
        this.setState({sapID: event.target.value});
    }
    handleSkill1(event) {
        this.setState({skill1: event.target.value});
    }
    handleSkill2(event) {
        this.setState({skill2: event.target.value});
    }
    handleSkill3(event) {
        this.setState({skill3: event.target.value});
    }
    handleInterest1(event) {
        this.setState({interest1: event.target.value});
    }
    handleInterest2(event) {
        this.setState({interest2: event.target.value});
    }
    handleInterest3(event) {
        this.setState({interest3: event.target.value});
    }
    handleGithub(event) {
        this.setState({github: event.target.value});
    }
    handleBehance(event) {
        this.setState({behance: event.target.value});
    }
    handleLinkedIn(event) {
        this.setState({linkedIn: event.target.value});
    }
    handleYear(event) {
        this.setState({year: event.target.value});
    }

    render() {

        return (
        	<div>
            <form method="POST">
        		<a href="" className="profile-view"><i className="material-icons">keyboard_arrow_left</i>Profile View</a>
        		<br/><br/><br/><br/><br/><br/><br/><br/>
            <center>
              <span className="mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="year">YEAR</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
        <input type="text" className="mdl-textfield__input" id="year" value={this.state.year} readOnly />
        <input type="hidden" value={this.state.year} name="year" / >
        <label for="year" className="mdl-textfield__label"></label>
        <ul for="year" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleYear}>
            <option className="mdl-menu__item" data-val="First" value="First">First</option>
            <option className="mdl-menu__item" data-val="Second" value="Second">Second</option>
            <option className="mdl-menu__item" data-val="Third" value="Third">Third</option>
        </ul>
    </div>

			        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			        <span className="mdl-selectfield mdl-js-selectfield">
			        	<label className="mdl-selectfield__label" for="sap-id">SAP ID</label>&nbsp;&nbsp;&nbsp;
						<input className="mdl-selectfield__select" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sap-id" value={this.state.sapID} onChange={this.handleSAP}/>
						<span className="mdl-textfield__error">Input is not a number!</span>
					</span>
          </center>
    			<br/><br/><br/><br/><br/>
				<div className="skills">
					<h1>SKILLS</h1>
					<p>Got bragging rights?<br/>Fill in your skills.</p>
				</div><br/>
          <center>
          <label className="skill-label mdl-selectfield__label" for="skill1">SKILL 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill1" value={this.state.skill1}  />
              <input type="hidden" value={this.state.skill1} name="skill1" / >
              <label for="skill1" className="mdl-textfield__label"></label>
              <ul for="skill1" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkill1} >
                <option className="mdl-menu__item" data-val="HTML" value="HTML">HTML</option>
                <option className="mdl-menu__item" data-val="CSS" value="CSS">CSS</option>
                <option className="mdl-menu__item" data-val="JAVASCRIPT" value="JAVASCRIPT">JAVASCRIPT</option>
              </ul>
          </div>
        <br/><br/><br/>
          <label className="skill-label mdl-selectfield__label" for="skill2">SKILL 2</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill2" value={this.state.skill2}  />
              <input type="hidden" value={this.state.skill2} name="skill2" / >
              <label for="skill2" className="mdl-textfield__label"></label>
              <ul for="skill2" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkill2}>
                <option className="mdl-menu__item" data-val="HTML" value="HTML">HTML</option>
                <option className="mdl-menu__item" data-val="CSS" value="CSS">CSS</option>
                <option className="mdl-menu__item" data-val="JAVASCRIPT" value="JAVASCRIPT">JAVASCRIPT</option>
              </ul>
          </div>
          <br/><br/><br/>
          <label className="skill-label mdl-selectfield__label" for="skill3">SKILL 3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill3" value={this.state.skill3}  />
              <input type="hidden" value={this.state.skill3} name="skill3" / >
              <label for="skill3" className="mdl-textfield__label"></label>
              <ul for="skill3" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkill3} >
                <option className="mdl-menu__item" data-val="HTML" value="HTML">HTML</option>
                <option className="mdl-menu__item" data-val="CSS" value="CSS">CSS</option>
                <option className="mdl-menu__item" data-val="JAVASCRIPT" value="JAVASCRIPT">JAVASCRIPT</option>
              </ul>
          </div>
			    </center>
				<br/><br/><br/><br/><br/>
				<div className="interests">
					<h1>INTERESTS</h1>
					<p>Curiosity never kills the cat.<br/>Fill in your interests.</p>
				</div><br/>
      <center>
        <label className="interest-label mdl-selectfield__label" for="interest1">INTEREST 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="mdl-textfield mdl-js-textfield getmdl-select">
            <input type="text" className="mdl-textfield__input" id="interest1" value={this.state.interest1} onClick={this.handleInterest1} />
            <input type="hidden" value={this.state.interest1}   name="interest1" / >
            <label for="interest1" className="mdl-textfield__label"></label>
            <ul for="interest1" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleInterest1} >
              <option className="mdl-menu__item" id="HTML" value="HTML">HTML</option>
              <option className="mdl-menu__item" data-val="CSS" value="CSS">CSS</option>
              <option className="mdl-menu__item" data-val="JAVASCRIPT" value="JAVASCRIPT">JAVASCRIPT</option>
            </ul>
        </div>
      <br/><br/><br/>
        <label className="interest-label mdl-selectfield__label" for="interest2">INTEREST 2</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="mdl-textfield mdl-js-textfield getmdl-select">
            <input className="mdl-textfield__input" id="interest2" value={this.state.interest2}  />
            <input type="hidden" value={this.state.interest2} name="interest2" / >
            <label for="interest2" className="mdl-textfield__label"></label>
            <ul for="interest2" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleInterest2}>
              <option className="mdl-menu__item"  value="HTML">HTML</option>
              <option className="mdl-menu__item"  value="CSS">CSS</option>
              <option className="mdl-menu__item"  value="JAVASCRIPT">JAVASCRIPT</option>
            </ul>
        </div>
        <br/><br/><br/>
          <label className="interest-label mdl-selectfield__label" for="interest3">INTEREST 3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input className="mdl-textfield__input" id="interest3" value={this.state.interest3}  />
              <input type="hidden" value={this.state.interest3} name="interest3" / >
              <label for="interest3" className="mdl-textfield__label"></label>
              <ul for="interest3" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleInterest3}>
                <option className="mdl-menu__item"  value="HTML">HTML</option>
                <option className="mdl-menu__item"  value="CSS">CSS</option>
                <option className="mdl-menu__item"  value="JAVASCRIPT">JAVASCRIPT</option>
              </ul>
          </div>
          <br/><br/><br/>

      </center>

				<br/><br/><br/><br/><br/>
				<div className="profile">
					<h1>PROFILE LINKS</h1>
					<br/><br/>
					<label for="linkedln" className="mdl-selectfield__label">Linkedln</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="linkedln" id="linkedln" value={this.state.linkedIn} onChange={this.handleLinkedIn}/><br/><br/><br/>
					<label for="github" className="mdl-selectfield__label">Github</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="github" id="github" value={this.state.github} onChange={this.handleGithub} /><br/><br/><br/>
					<label for="twitter" className="mdl-selectfield__label">Twitter</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="twitter" id="twitter" /><br/><br/><br/>
					<label for="behance" className="mdl-selectfield__label" value={this.state.behance} onChange={this.handleBehance}>Behance</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="behance" id="behance" /><br/>
				</div>
        <br/>
        <br/>
        <button type="submit" className="save-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
          SAVE
        </button>
      </form>
        	</div>
       	);
    }
}

export default Main;
