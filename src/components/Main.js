import React, { Component } from 'react';
import '../App.css';
class Main extends Component {
    render() {
        return (
        	<div>
        	 <form>
        		<a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
        		<br/><br/><br/><br/>
        		<center>
              <span className="description title">Create a Hackathon team</span>
              <br/><br/><br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="projname">Hackathon name</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="projname"/>
              <input type="hidden" name="projname"/>
              <label for="projname" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="teamname">Team name</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="teamname"/>
              <input type="hidden" name="teamname"/>
              <label for="teamname" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="teamlead">Team leader</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="teamlead"/>
              <input type="hidden" name="teamlead"/>
              <label for="teamlead" className="mdl-textfield__label"></label>
              </div>

              <br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="number">Number of members</label>&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" pattern="-?[1-3]*(\.[1-3]+)?" id="number"/>
              <input type="hidden" name="number"/>
              <label for="number" className="mdl-textfield__label"></label>
              <span class="mdl-textfield__error">Input is not in the range!</span>
              <ul for="number" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
              <option className="mdl-menu__item" data-val="1" value="1">1</option>
              <option className="mdl-menu__item" data-val="2" value="2">2</option>
              <option className="mdl-menu__item" data-val="3" value="3">3</option>
              </ul>
              </div>
              <i for="number" className="material-icons">keyboard_arrow_down</i>

              <br/><br/><br/>

              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="projd">Team description</label>
              </span>
              <br/>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <textarea className="mdl-textfield__input" type="text" rows= "8" id="projd" placeHolder="This is what applicants will see as your team description. Keep it updated and clearly state your requirements."></textarea>
              <input type="hidden" name="projd"/>
              <label className="mdl-textfield__label" for="projd"></label>
              </div>

              <br/><br/>

              <span className="description diff">Skills you are looking for</span>
              <br/><br/>
              <span className="description mdl-selectfield mdl-js-selectfield">
                <label className="mdl-selectfield__label" for="skill1">Skill 1</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="skill1"/>
              <input type="hidden" name="skill1"/>
              <label for="skill1" className="mdl-textfield__label"></label>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i for="number" className="material-icons">keyboard_arrow_down</i>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="mdl-button mdl-js-button mdl-button--fab add mdl-js-ripple-effect">
              <i className="material-icons">add</i>
              </button>

              <br/><br/><br/><br/><br/>

              <button class="mdl-button mdl-js-button search mdl-button--raised mdl-js-ripple-effect">
              Search for members
              </button>

				    </center>
			     </form>
        	</div>
       	);
    }
}

export default Main;
