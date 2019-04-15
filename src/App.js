import React, { Component } from 'react';
import './App.css';

import Game from './Containers/Game'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>MetroBeat</h1>
        <Game />
      </div>
    );
  }
}

export default App;
