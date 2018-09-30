import React, { Component } from 'react';
import '../App.css';
import DjangoCSRFToken from 'django-react-csrftoken';
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            hackathon: '',
            hackathon_name: '',
            name:'',
            // teamlead:'',
            vacancies: '',
            description: '',
            skills_required:'',
        };

        this.handleHackathon= this.handleHackathon.bind(this);
        // this.handleHackathon_name= this.handleHackathon_name.bind(this);
        this.handleName= this.handleName.bind(this);
        // this.handleTeamlead= this.handleTeamlead.bind(this);
        this.handleVacancies= this.handleVacancies.bind(this);
        this.handleDescription= this.handleDescription.bind(this);
        this.handleSkills_required = this.handleSkills_required.bind(this);
        this.showCheckboxes=this.showCheckboxes.bind(this);
    }

    handleHackathon(event) {
        this.setState({hackathon: event.target.value});
    }

    // handleHackathon_name(event) {
    //     this.setState({hackathon_name: event.target.value});
    // }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    // handleTeamlead(event) {
    //     this.setState({teamlead: event.target.value});
    // }

    handleVacancies(event) {
        this.setState({vacancies: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handleSkills_required(event) {
        this.setState({skills_required: event.target.value});
    }

    showCheckboxes(event){
      event.preventDefault();
      var checkboxes = document.getElementById('checkboxes');
      if (!this.state.expanded) {
      checkboxes.style.display = "block";
      this.setState({expanded : true});
      }
      else {
      checkboxes.style.display = "none";
      this.setState({expanded : false});
      }
    }

    render() {
        return (
        	<div>
        	 <form method = "POST">
             <DjangoCSRFToken/>
        		<a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
        		<br/><br/><br/><br/>
        		<center>
              <span className="description title">Create a Hackathon team</span>
              <br/><br/><br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="hackathon">Hackathon name</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              {/* There must be some hack around this */}
              {/* This hack is awesome!!!! */}
              <input type="text" className="mdl-textfield__input" id="id_hackathon" value={list_hack[this.state.hackathon]} onChange={this.handleHackathon}/>
              <input type="hidden" value={this.state.hackathon} name="hackathon"/>
              <label for="id_hackathon" className="mdl-textfield__label"></label>
              <ul htmlFor="id_hackathon" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleHackathon} >
                {Object.values(hackathons).map(hackathon => (
                  <option className="mdl-menu__item" data-val={hackathon.id} value={hackathon.id}>{hackathon.name}</option>
              ))}
              </ul>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="name">Team name</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="name" value={this.state.name} onChange={this.handleName}/>
              <input type="hidden" value={this.state.name} name="name"/>
              <label for="name" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>
              {/*
              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="teamlead">Team leader</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="teamlead" value={this.state.teamlead} onChange={this.handleTeamlead}/>
              <input type="hidden" name="teamlead"/>
              <label for="teamlead" className="mdl-textfield__label"></label>
              </div>

              <br/><br/> */}

              <span className="description mdl-selectfield mdl-js-selectfield">
               <label className="mdl-selectfield__label" for="id_vacancies">No. of members</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="number" className="mdl-textfield__input" pattern="-?[1-3]*(\.[1-3]+)?" id="id_vacancies" value={this.state.vacancies} readonly />
              <input type="hidden" value={this.state.vacancies} name="vacancies"/>
              <label for="id_vacancies" className="mdl-textfield__label"></label>
              <span class="mdl-textfield__error">Input is not in the range!</span>
              <ul for="id_vacancies" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleVacancies}>
              <option className="mdl-menu__item" data-val={1} value={1}>1</option>
              <option className="mdl-menu__item" data-val={2} value={2}>2</option>
              <option className="mdl-menu__item" data-val={3} value={3}>3</option>
              </ul>
              </div>

              <br/><br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="id_description">Team description</label>
              </span>
              <br/>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <textarea className="mdl-textfield__input" value={this.state.description} onChange={this.handleDescription} type="text" rows= "8" id="id_description" placeHolder="This is what applicants will see as your team description. Keep it updated and clearly state your requirements."></textarea>
              <input type="hidden" value={this.state.description} name="description"/>
              <label className="mdl-textfield__label" for="id_description"></label>
              </div>

              <br/><br/>

              <span className="description diff">Skills you are looking for</span>
              <br/><br/>

              <div className="multiselect">
                <div className="selectBox" onClick={this.showCheckboxes}>
                  <select name="skills_required" id="id_skills_required">
                    {/* <option>Select an option</option> */}
                  </select>
                  <div className="overSelect"></div>
                </div>
                <div id="checkboxes" className="description">
                {/*
                  <label for="one">
                  <input type="checkbox" name="skills_required" value="first" id="one" />First checkbox</label>
                  <label for="two">
                  <input type="checkbox" name="skills_required" value="second" id="two" />Second checkbox</label>
                  <label for="three">
                  <input type="checkbox" name="skills_required" value="three" id="three" />Third checkbox</label>*/}
                  {Object.values(skills).map(skill => (
                      <label for={skill.id}>
                      <input type="checkbox" name="skills_required" data-val={skill.id} value={skill.id} id={skill.id} />{skill.skill}</label>
                  ))}
                </div>
              </div>

              {/*
              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="id_skills_required">Skill :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="id_skills_required" value={list_skill[this.state.skills_required]} onChange={this.handleSkills_required}/>
              <input type="hidden" value={this.state.skills_required} name="skills_required"/>
              <label for="id_skills_required" className="mdl-textfield__label"></label>
              <ul htmlFor="id_skills_required" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleSkills_required} >
                {Object.values(skills).map(skill => (
                  <option className="mdl-menu__item" data-val={skill.id} value={skill.id}>{skill.skill}</option>
              ))}
              </ul>
              </div>
              */}

              &nbsp;&nbsp;&nbsp;&nbsp;
              {/*
              <button className="add mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
              <i className="material-icons">add</i>
              </button>
              */}

              <br/><br/><br/><br/>

              <button type="submit" className="search mdl-button mdl-js-button mdl-js-ripple-effect">
              Create Team
              </button>

				    </center>
			     </form>
        	</div>
       	);
    }
}

export default Main;
