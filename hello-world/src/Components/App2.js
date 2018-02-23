import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import './App2.css';
import Form  from './Forms';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Link } from 'react-router-dom';
class App2 extends Component {
  render() {
    return (
      <div >
        <a name="top"></a>
        <Header />
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Main />
        <br/><br/><br/><br/>
        <br/><br/><br/>

        <Footer />
      </div>
    );
  }
}
export default App2;
