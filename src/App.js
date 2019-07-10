import React, { Component } from 'react';
import './App.css';
import logo from './Assets/images/metrobeat_logo.png'

import Welcome from './Containers/Welcome'

class App extends Component {

  render() {
    return (
      <div className="app-container">
        <div className="logo-container">
          <img src={logo} alt="metrobeat logo" className='logo'/>
        </div>
        <br/>
          <Welcome />
      </div>
    );
  }
}

export default App;
