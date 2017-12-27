import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
          <div className="container">
            <div className="login-container">
                <div id="output"></div>
                <div className="avatar"></div>
          <div className="form-box">
            <Form />
          </div>
          </div>
         </div>
    );
  }
}
class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            username:'',
            password:'',
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.updateMyScreen = this.updateMyScreen.bind(this);
    }
    handleUsername(event) {
        this.setState({username: event.target.value});
    }
    handlePassword(event) {
        this.setState({password: event.target.value});
    }


    updateMyScreen(){
        event.preventDefault();
        var count = this.state.count;
        if(this.state.username==='user'){
            alert('Logged in');
            count++;
        }
        else{
            alert("Invalid details");
        }
    }

    render(){
        return(
        <form onSubmit={this.updateMyScreen}>
            <input value={this.state.username} type="text" placeholder="username" onChange={this.handleUsername}  />
                <input type="password" value={this.state.password} placeholder="password" onchange={this.handlePassword} />
            <center>
                <button className="btn btn-info btn-block login" type="submit">
                People Online = {this.state.count}
                </button>
            </center>
        </form>
        );
    }
}

export default App;
