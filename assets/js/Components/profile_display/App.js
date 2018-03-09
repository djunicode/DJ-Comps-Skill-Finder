import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';
class App extends Component {
  render() {
    return (
        <div>
          <a name="top"></a>
          <Header />
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/>
          <Main />
          <br/><br/><br/><br/>
          <Footer />
        </div>
    );
  }
}

export default App;
