import React, { Component } from 'react';
import './App.css';

import Button from './Components/Button'

const API = 'https://api.spotify.com/v1/me/playlists'

class App extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      playlists: []
    }
  }

  componentDidMount = () => {
      this.fetchUser()
    }

    fetchUser = () => {
      fetch('http://localhost:3000/api/v1/users')
      .then(res => res.json())
      .then(data => {
        this.setState({users: data})
        console.log(this.state.users[0].access_token)
        this.fetchPlaylists()
      })
    }

    fetchPlaylists = () => {
      fetch(API, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[0].access_token
        }}
      )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({playlists: data})
      })
    }
    
  render() {
    return (
      <div className="App">
        <h1>MetroBeat</h1>

        <Button />

        <h3>User Information</h3>
  
      </div>
    );
  }
}

export default App;
