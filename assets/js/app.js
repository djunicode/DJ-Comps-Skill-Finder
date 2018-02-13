import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Form  from './Components/Forms';
class App extends Component {
   render(){
       return(
         <div>
         <div className="container">
         <div className = "logo"></div>
         <div className="login-container">
             <div id="output"></div>
             <div className="avatar"></div>
       <div className="form-box">
          <Form />
       </div>
       </div>
      </div>
         </div>
       );
   }
}
export default App;
