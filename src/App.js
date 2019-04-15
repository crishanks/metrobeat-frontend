import React, { Component } from 'react';
import './App.css';

import Welcome from './Containers/Welcome'

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>MetroBeat</h1>
        <Welcome />
      </div>
    );
  }
}

export default App;
