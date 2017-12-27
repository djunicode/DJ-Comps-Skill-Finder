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
    render(){
        return(
        <form action="" method="">
            <input name="username" type="text" placeholder="username"  />
                <input type="password" placeholder="password" />
            <center> <button className="btn btn-info btn-block login" type="submit">Login</button></center>
        </form>
        );
    }
}

export default App;
