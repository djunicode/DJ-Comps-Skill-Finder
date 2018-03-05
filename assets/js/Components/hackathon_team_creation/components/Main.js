import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            projname: '',
            teamname:'',
            teamlead:'',
            noofmem: '',
            projdesc: '',
            skill1:'',
        };

        this.handleProjname= this.handleProjname.bind(this);
        this.handleTeamname= this.handleTeamname.bind(this);
        this.handleTeamlead= this.handleTeamlead.bind(this);
        this.handleNoofmem= this.handleNoofmem.bind(this);
        this.handleProjdesc= this.handleProjdesc.bind(this);
    }

    handleProjname(event) {
        this.setState({projname: event.target.value});
    }

    handleTeamname(event) {
        this.setState({teamname: event.target.value});
    }

    handleTeamlead(event) {
        this.setState({teamlead: event.target.value});
    }

    handleNoofmem(event) {
        this.setState({noofmem: event.target.value});
    }

    handleProjdesc(event) {
        this.setState({projdesc: event.target.value});
    }

    render() {
        return (
        	<div>
        	 <form method = "POST">
        		<a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
        		<br/><br/><br/><br/>
        		<center>
              <span className="description title">Create a Hackathon team</span>
              <br/><br/><br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="projname">Hackathon name</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="projname" value={this.state.projname} onChange={this.handleProjname}/>
              <input type="hidden" name="projname"/>
              <label for="projname" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="teamname">Team name</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="teamname" value={this.state.teamname} onChange={this.handleTeamname}/>
              <input type="hidden" name="teamname"/>
              <label for="teamname" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="teamlead">Team leader</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="teamlead" value={this.state.teamlead} onChange={this.handleTeamlead}/>
              <input type="hidden" name="teamlead"/>
              <label for="teamlead" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
               <label className="mdl-selectfield__label" for="number">No. of members</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" pattern="-?[1-3]*(\.[1-3]+)?" id="number" value={this.state.noofmem} readonly />
              <input type="hidden" value={this.state.noofmem} name="number"/>
              <label for="number" className="mdl-textfield__label"></label>
              <span class="mdl-textfield__error">Input is not in the range!</span>
              <ul for="number" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" onClick={this.handleNoofmem}>
              <option className="mdl-menu__item" data-val="1" value="1">1</option>
              <option className="mdl-menu__item" data-val="2" value="2">2</option>
              <option className="mdl-menu__item" data-val="3" value="3">3</option>
              </ul>
              </div>

              <br/><br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="projd">Team description</label>
              </span>
              <br/>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <textarea className="mdl-textfield__input" value={this.state.projdesc} onChange={this.handleProjdesc} type="text" rows= "8" id="projd" placeHolder="This is what applicants will see as your team description. Keep it updated and clearly state your requirements."></textarea>
              <input type="hidden" name="projd"/>
              <label className="mdl-textfield__label" for="projd"></label>
              </div>

              <br/><br/>

              <span className="description diff">Skills you are looking for</span>
              <br/><br/>
              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="skill1">Skill :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill1"/>
              <input type="hidden" name="skill1"/>
              <label for="skill1" className="mdl-textfield__label"></label>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="add mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
              <i className="material-icons">add</i>
              </button>

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
