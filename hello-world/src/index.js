import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  App2  from './Components/App2';
import './index.css';
import App from './App';


ReactDOM.render(
  <Router>
        <div>
          <Route exact path="/" component={App}/ >
          <Route  path="/profile" component={App2} />

        </div>
    </Router>,
  document.getElementById('root')
);
