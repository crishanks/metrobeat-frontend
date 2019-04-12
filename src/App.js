import React, { Component } from 'react';
import './App.css';

import SpotifyPlaybackSDK from './Components/SpotifyPlaybackSDK'

import Button from './Components/Button'

const usersAPI = 'http://localhost:3000/api/v1/users'
const playlistAPI = 'https://api.spotify.com/v1/me/playlists'
const devicesAPI = 'https://api.spotify.com/v1/me/player/devices'

class App extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      playlists: [],
      devices: []
    }
  }

  componentDidMount = () => {
      this.fetchUser()
    }

    fetchUser = () => {
      fetch(usersAPI)
      .then(res => res.json())
      .then(data => {
        this.setState({users: data})
        this.fetchPlaylists()
      })
    }

    fetchPlaylists = (shouldRetry=true) => {
      fetch(playlistAPI, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[0].access_token
        }}
      )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error && shouldRetry) {
          this.refreshToken()
        } else {
          this.setState({playlists: data})
        }
      })
      this.fetchDevices()
    }

    refreshToken = () => {
      fetch(usersAPI)
      .then(results => results.json())
      .then(json => {
        this.setState({users: json})
      })
      this.fetchPlaylists(false)
    }

    fetchDevices = () => {
      fetch(devicesAPI, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[0].access_token
        }}
      )
      .then(res => res.json())
      .then(data => {
        this.setState({devices: data})
      })
    }
    
  render() {
    return (
      <div className="App">
        <h1>MetroBeat</h1>

        <Button />

        <SpotifyPlaybackSDK />
  
      </div>
    );
  }
}

export default App;
