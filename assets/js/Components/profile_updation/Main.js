import React, { Component } from 'react';
import './App.css';
import DjangoCSRFToken from 'django-react-csrftoken';
class Main extends Component {
  constructor(props){
        super(props);
        this.state = {
            linkedIn: user.linkedin_url || '' ,
            behance: user.behance_url || '',
            github: user.github_url || '',
            interest1: '',
            interest2: '',
            interest3:'',
            skill1: skills[user.skill_1] || '',
            skill2: skills[user.skill_2] || '',
            skill3: skills[user.skill_3] || '',
            sapID: parseInt(user.sap_id)|| '',
            year: user.year || '',
            user: '',
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
            <DjangoCSRFToken/>
        		<a href="" className="profile-view"><i className="material-icons">keyboard_arrow_left</i>Profile View</a>
        		<br/><br/><br/><br/><br/>
            <center>
              <span className="mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" htmlFor="year">YEAR</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
        <input type="text" className="mdl-textfield__input" id="year" value={this.state.year} readOnly />
        <input type="hidden" value={this.state.year} name="year" />
        <label htmlFor="year" className="mdl-textfield__label"></label>
        <ul htmlFor="year" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleYear}>
            <option className="mdl-menu__item" data-val="FE" value="FE">FE</option>
            <option className="mdl-menu__item" data-val="SE" value="SE">SE</option>
            <option className="mdl-menu__item" data-val="TE" value="TE">TE</option>
            <option className="mdl-menu__item" data-val="BE" value="BE">BE</option>
            <option className="mdl-menu__item" data-val="AL" value="AL">Alumni</option>
        </ul>
    </div>

			        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			        <span className="mdl-selectfield mdl-js-selectfield">
			        	<label className="mdl-selectfield__label" htmlFor="sap-id">SAP ID</label>&nbsp;&nbsp;&nbsp;
						<input className="mdl-selectfield__select" name="sap_id" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sap-id" value={this.state.sapID} onChange={this.handleSAP}/>
						<span className="mdl-textfield__error">Input is not a number!</span>
					</span>

          </center>
    			<br/><br/><br/><br/><br/>
				<div className="skills">
					<h1>SKILLS</h1>
					<p>Got bragging rights?<br/>Fill in your skills.</p>
				</div><br/>
          <center>
          <label className="skill-label mdl-selectfield__label" htmlFor="skill1">SKILL 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill1" value={this.state.skill1}  />
              <input type="hidden" value={this.state.skill1} name="skill1" />
              <label htmlFor="skill1" className="mdl-textfield__label"></label>
              <ul htmlFor="skill1" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkill1} >
                {Object.values(skills).map(skill => (
                  <option className="mdl-menu__item" data-val={skill} value={skill}>{skill}</option>
              ))}
              {/* Todo solve warning*/}

              </ul>
          </div>
        <br/><br/><br/>
          <label className="skill-label mdl-selectfield__label" htmlFor="skill2">SKILL 2</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill2" value={this.state.skill2}  />
              <input type="hidden" value={this.state.skill2} name="skill2" / >
              <label htmlFor="skill2" className="mdl-textfield__label"></label>
              <ul htmlFor="skill2" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkill2}>
                {Object.values(skills).map(skill => (
                  <option className="mdl-menu__item" data-val={skill} value={skill}>{skill}</option>
                ))}
              {/* Todo solve warning*/}
              </ul>
          </div>
          <br/><br/><br/>
          <label className="skill-label mdl-selectfield__label" htmlFor="skill3">SKILL 3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill3" value={this.state.skill3}  />
              <input type="hidden" value={this.state.skill3} name="skill3" / >
              <label htmlFor="skill3" className="mdl-textfield__label"></label>
              <ul htmlFor="skill3" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkill3} >
                {Object.values(skills).map(skill => (
                  <option className="mdl-menu__item" data-val={skill} value={skill}>{skill}</option>
                ))}
              {/* Todo solve warning*/}
              </ul>
          </div>
			    </center>
				<br/><br/><br/><br/><br/>
				<div className="interests">
					<h1>INTERESTS</h1>
					<p>Curiosity never kills the cat.<br/>Fill in your interests.</p>
				</div><br/>
      <center>
        <label className="interest-label mdl-selectfield__label" htmlFor="interest1">INTEREST 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="mdl-textfield mdl-js-textfield getmdl-select">
            <input type="text" className="mdl-textfield__input" id="interest1" value={this.state.interest1} onClick={this.handleInterest1} />
            <input type="hidden" value={this.state.interest1}   name="interest1" / >
            <label htmlFor="interest1" className="mdl-textfield__label"></label>
            <ul htmlFor="interest1" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleInterest1} >
              <option className="mdl-menu__item" id="HTML" value="HTML">HTML</option>
              <option className="mdl-menu__item" data-val="CSS" value="CSS">CSS</option>
              <option className="mdl-menu__item" data-val="JAVASCRIPT" value="JAVASCRIPT">JAVASCRIPT</option>
            </ul>
        </div>
      <br/><br/><br/>
        <label className="interest-label mdl-selectfield__label" htmlFor="interest2">INTEREST 2</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="mdl-textfield mdl-js-textfield getmdl-select">
            <input className="mdl-textfield__input" id="interest2" value={this.state.interest2}  />
            <input type="hidden" value={this.state.interest2} name="interest2" / >
            <label htmlFor="interest2" className="mdl-textfield__label"></label>
            <ul htmlFor="interest2" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleInterest2}>
              <option className="mdl-menu__item"  value="HTML">HTML</option>
              <option className="mdl-menu__item"  value="CSS">CSS</option>
              <option className="mdl-menu__item"  value="JAVASCRIPT">JAVASCRIPT</option>
            </ul>
        </div>
        <br/><br/><br/>
          <label className="interest-label mdl-selectfield__label" htmlFor="interest3">INTEREST 3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input className="mdl-textfield__input" id="interest3" value={this.state.interest3}  />
              <input type="hidden" value={this.state.interest3} name="interest3" / >
              <label htmlFor="interest3" className="mdl-textfield__label"></label>
              <ul htmlFor="interest3" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleInterest3}>
                <option className="mdl-menu__item"  value="HTML">HTML</option>
                <option className="mdl-menu__item"  value="CSS">CSS</option>
                <option className="mdl-menu__item"  value="JAVASCRIPT">JAVASCRIPT</option>
              </ul>
          </div>
          <br/><br/><br/>



      </center>

				<br/><br/><br/>
				<div className="profile">
					<h1>PROFILE LINKS</h1>
					<br/><br/>
					<label htmlFor="linkedln" className="mdl-selectfield__label">Linkedln</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="linkedln" id="linkedln" value={this.state.linkedIn} onChange={this.handleLinkedIn}/><br/><br/><br/>
					<label htmlFor="github" className="mdl-selectfield__label">Github</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="github" id="github" value={this.state.github} onChange={this.handleGithub} /><br/><br/><br/>
					<label htmlFor="twitter" className="mdl-selectfield__label">Twitter</label>&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="twitter" id="twitter" /><br/><br/><br/>
					<label htmlFor="behance" className="mdl-selectfield__label" value={this.state.behance} onChange={this.handleBehance}>Behance</label>&nbsp;&nbsp;&nbsp;&nbsp;
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
