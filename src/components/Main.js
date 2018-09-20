import React, { Component } from 'react';
import '../App.css';
// import DjangoCSRFToken from 'django-react-csrftoken';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathon_name: '',
      hackathon_date: '',
      hackathon_desc: '',
      hackathon_url: ''
    };

    this.handleHackathon_name = this.handleHackathon_name.bind(this);
    this.handleHackathon_date = this.handleHackathon_date.bind(this);
    this.handleHackathon_desc = this.handleHackathon_desc.bind(this);
    this.handleHackathon_url = this.handleHackathon_url.bind(this);
  }

  handleHackathon_name(event) {
    this.setState({ hackathon_name: event.target.value });
  }

  handleHackathon_date(event) {
    this.setState({ hackathon_date: event.target.value });
  }

  handleHackathon_desc(event) {
    this.setState({ hackathon_desc: event.target.value });
  }

  handleHackathon_url(event) {
    this.setState({ hackathon_url: event.target.value });
  }

  render() {
    return (
      <div>
        <form method="POST">
        {/* <DjangoCSRFToken/> */}
          <a href="#" className="back-button"><i className="material-icons">keyboard_arrow_left</i>Back</a>
          <br /><br /><br /><br />
          <center>
            <span className="description title">Add a Hackathon</span>
            <br /><br /><br /><br />

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="hackathon_name">Hackathon name</label>&nbsp;&nbsp;&nbsp;
              </span>
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="hackathon_name" value={this.state.hackathon_name} onChange={this.handleHackathon_name} />
              <input type="hidden" name="hackathon_name" />
              <label for="hackathon_name" className="mdl-textfield__label"></label>
            </div>

            <br /><br />

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="hackathon_date">Hackathon date</label>&nbsp;&nbsp;&nbsp;
              </span>
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="date" className="mdl-textfield__input" id="hackathon_date" value={this.state.hackathon_date} onChange={this.handleHackathon_date} />
            </div>

            <br /><br />

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="hackathon_url">Hackathon URL</label>&nbsp;&nbsp;&nbsp;
              </span>
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <input type="text" className="mdl-textfield__input" id="hackathon_url" value={this.state.hackathon_url} onChange={this.handleHackathon_url} />
              <input type="hidden" name="hackathon_url" />
              <label for="hackathon_url" className="mdl-textfield__label"></label>
            </div>

            <br /><br /><br/>

            <span className="description mdl-selectfield mdl-js-selectfield">
              <label className="mdl-selectfield__label" for="hackathon_desc">Hackathon description</label>
            </span>
            <br />
            <div className="mdl-textfield mdl-js-textfield getmdl-select">
              <textarea className="mdl-textfield__input" value={this.state.hackathon_desc} onChange={this.handleHackathon_desc} type="text" rows="8" id="hackathon_desc" placeHolder="This is what applicants will see as your hackathon description. Keep it updated and clearly state your requirements."></textarea>
              <input type="hidden" name="hackathon_desc" />
              <label className="mdl-textfield__label" for="hackathon_desc"></label>
            </div>

            <br /><br />

            <br /><br />

            <button type="submit" className="search mdl-button mdl-js-button mdl-js-ripple-effect">
              Add Hackathon
              </button>

          </center>
        </form>
      </div>
    );
  }
}

export default Main;
