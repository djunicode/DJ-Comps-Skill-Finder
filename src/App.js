import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';
class App extends Component {
  render() {
    return (
        <div >
          <a name="top"></a>
          <Header />
          <br/><br/><br/><br/><br/><br/>
          <Main />
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Footer />
     </div>
    );
  }
}

export default App;
