import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
class App extends Component {
  render() {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <a name="top"></a>
         <Header />

         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                 <br/><br/><br/>
         <Footer />
     </div>
    );
  }
}

export default App;
