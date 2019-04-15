import React, { Component } from 'react'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import Button from '../Components/Button'
import SongFinder from '../Containers/SongFinder'

const usersAPI = 'http://localhost:3000/api/v1/users'
const playlistAPI = 'https://api.spotify.com/v1/me/playlists'
const devicesAPI = 'https://api.spotify.com/v1/me/player/devices'

class Welcome extends Component {
  constructor() {
    super()

    let isLoggedIn = false;
    if (window.location.href.includes("/songfinder")) {
      isLoggedIn = true;
    }

    this.state = {
      isLoggedIn,
      users: [],
      playlists: [], 
      devices: []
    }
  }

  componentDidMount = () => {
    this.fetchUser()
  }

    fetchUser = () => {
      return fetch(usersAPI)
      .then(res => res.json())
      .then(data => {
        this.setState({users: data})
      })
      .then(data => {this.fetchPlaylists()})
    }

    fetchPlaylists = (shouldRetry=true) => {
      return fetch(playlistAPI, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[1].access_token
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
      .then(data => {this.fetchDevices()})
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
          'Authorization': 'Bearer ' + this.state.users[1].access_token
        }}
      )
      .then(res => res.json())
      .then(data => {
        this.setState({devices: data})
      })
    }

    //render the welcome component (login, search, and play button)
    //when play button is clicked, rerout to /game and render <Game /> 
    //App.js will now render <Welcome /> instead of <Game />

    renderWelcomeOrSongFinder = () => {
      if (false && !this.state.isLoggedIn) {
        return <Button />
      } else {
        return <Router>
          <Route exact path="/"
            component={() => <Button />} 
          />
          <Route exact path="/songfinder"
            component={() => <SongFinder state={this.state} />} 
          />
        </Router>
      }
    }

  render() {
    return (
      <div> 
        {this.renderWelcomeOrSongFinder()}
      </div>
    )
  }
}

export default Welcome

          // <SearchBar 
          //   user={this.state.users[1]} 
          //   fetchSongs={this.fetchSongs} 
          //   handleChange={this.handleChange} 
          //   fetchSongAnalysis={this.fetchAudioAnalysis}
          // />