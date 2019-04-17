import React, { Component } from 'react';
import './App.css';

import Welcome from './Containers/Welcome'

class App extends Component {

  render() {
    return (
      <div className="app-container">
        <h1 className='logo'>MetroBeat</h1>
        <Welcome />
      </div>
    );
  }
}

export default App;
