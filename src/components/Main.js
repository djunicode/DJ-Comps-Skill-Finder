import React, { Component } from 'react';
import '../App.css';
// import DjangoCSRFToken from 'django-react-csrftoken';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: '',
      project_desc: '',
      skills_required: '',
      project_url: ''
    };

    this.handleProject_name = this.handleProject_name.bind(this);
    this.handleProject_desc = this.handleProject_desc.bind(this);
    this.handleSkills_required = this.handleSkills_required.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.handleProject_url = this.handleProject_url.bind(this);
  }

  handleProject_name(event) {
    this.setState({ project_name: event.target.value });
  }

  handleProject_desc(event) {
    this.setState({ project_desc: event.target.value });
  }

  handleSkills_required(event) {
    this.setState({ skills_required: event.target.value });
  }

  showCheckboxes(event) {
    event.preventDefault();
    var checkboxes = document.getElementById('checkboxes');
    if (!this.state.expanded) {
      checkboxes.style.display = "block";
      this.setState({ expanded: true });
    }
    else {
      checkboxes.style.display = "none";
      this.setState({ expanded: false });
    }
  }

  handleProject_url(event) {
    this.setState({ project_url: event.target.value });
  }

  render() {
    return (
      <div>
        <form method="POST">
          {/* <DjangoCSRFToken/> */}
          <a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
          <br /><br /><br /><br />
          <center>
            <span className="description title">Add a new Project</span>
            <br /><br /><br /><br />

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="project_name">Project name</label>&nbsp;&nbsp;&nbsp;
              </span>
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="project_name" value={this.state.project_name} onChange={this.handleProject_name} />
              <input type="hidden" name="project_name" />
              <label for="project_name" className="mdl-textfield__label"></label>
            </div>

            <br /><br />

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="project_url">Project URL</label>&nbsp;&nbsp;&nbsp;
              </span>
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="project_url" value={this.state.project_url} onChange={this.handleProject_url} />
              <input type="hidden" name="project_url" />
              <label for="project_url" className="mdl-textfield__label"></label>
            </div>

            <br /><br /><br/>

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="project_desc">Project description</label>
            </span>
            <br />
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <textarea className="mdl-textfield__input" value={this.state.project_desc} onChange={this.handleProject_desc} type="text" rows="5" id="project_desc" placeHolder="This is what applicants will see as your hackathon description. Keep it updated and clearly state your requirements."></textarea>
              <input type="hidden" name="project_desc" />
              <label className="mdl-textfield__label" for="project_desc"></label>
            </div>

            <br /><br />

            <span className="description diff">Skills you are looking for</span>
            <br /><br />

            <div className="multiselect">
              <div className="selectBox" onClick={this.showCheckboxes}>
                <select name="skills_required" id="id_skills_required">
                  {/* <option>Select an option</option> */}
                </select>
                <div className="overSelect"></div>
              </div>
              <div id="checkboxes" className="description">

                <label for="one">
                  <input type="checkbox" name="skills_required" value="first" id="one" />First checkbox</label>
                <label for="two">
                  <input type="checkbox" name="skills_required" value="second" id="two" />Second checkbox</label>
                <label for="three">
                  <input type="checkbox" name="skills_required" value="three" id="three" />Third checkbox</label>

                {/* {Object.values(skills).map(skill => (
                  <label for={skill.id}>
                    <input type="checkbox" name="skills_required" data-val={skill.id} value={skill.id} id={skill.id} />{skill.skill}</label>
                ))} */}

              </div>
            </div>

            <br /><br />

            <br /><br />

            <button type="submit" className="search mdl-button mdl-js-button mdl-js-ripple-effect">
              Add Project
              </button>

          </center>
        </form>
      </div>
    );
  }
}

export default Main;
