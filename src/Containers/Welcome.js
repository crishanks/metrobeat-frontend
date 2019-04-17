import React, { Component } from 'react'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import Button from '../Components/Button'
import SongFinder from '../Containers/SongFinder'
import Game from '../Containers/Game'

const usersAPI = 'http://localhost:3000/api/v1/users'
const playlistAPI = 'https://api.spotify.com/v1/me/playlists'
const newPlaylistAPI = 'https://api.spotify.com/v1/users/'
const devicesAPI = 'https://api.spotify.com/v1/me/player/devices'
const audioAnalysisAPI = "https://api.spotify.com/v1/audio-analysis/"

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
      devices: [],
      songChosen: false,
      currentSongAnalysis: {},
      chosenSong: [],
      gameLoaded: false
    }
  }

  componentDidMount = () => {
    this.fetchUser()
  }

    fetchUser = () => {
      console.log('fetching user')
      return fetch(usersAPI)
      .then(res => res.json())
      .then(data => {
        console.log('setting user state')
        this.setState({users: data})
      })
      .then(data => {this.fetchPlaylists()})
    }

    fetchPlaylists = (shouldRetry=true) => {
      console.log('fetching playlists')
      return fetch(playlistAPI, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[1].access_token
        }}
      )
      .then(res => res.json())
      .then(data => {
        console.log('playlists data', data)
        if (data.error && shouldRetry) {
          this.refreshToken()
        } else {
          console.log('setting playlists state')
          this.setState({playlists: data})
        }
      })
      .then(data => this.createPlaylist())
    }

    createPlaylist = () => {
      console.log('creating playlist')
      let url = `https://api.spotify.com/v1/users/${this.state.users[1].spotify_id}/playlists`
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.state.users[1].access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': 'MetroBeat'
        })}
      )
      .then(res => res.json())
      .then(data => {
        console.log('new playlist data', data)
      })
      .then(data => {this.fetchDevices()})
    }

    refreshToken = () => {
      console.log('refreshing token')
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

    fetchAudioAnalysis = () => {
      fetch(audioAnalysisAPI + this.state.chosenSong.id, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[1].access_token
        }
      })
      .then(results => results.json())
      .then(json => {
        this.setState({currentSongAnalysis: json})
        console.log('song analysis state', this.state.currentSongAnalysis)
      })
      this.setState({gameLoaded:true})
    }

    songChosen = () => {
      this.setState({songChosen: true})
      console.log('in songChosen, songChosen', this.state.songChosen)
    }

  renderWelcomeOrSongFinderOrGame = () => {
    console.log('renderWelcomeOr...', this.state.songChosen)
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <div className="message">
            <h1>Welcome to MetroBeat</h1>
            <h3>The First Ever Gamified Playlister</h3>
          </div>
          <div className="login-button">
            <Button />
          </div>
        </div>
      )
    } else if (this.state.isLoggedIn && !this.state.songChosen) {
      return <Router>
        <Route exact path="/"
          component={() => <Button />} 
        />
        <Route exact path="/songfinder"
          component={() => <SongFinder state={this.state}
          songChosen={this.songChosen} handleChooseSongClick={this.handleChooseSongClick}/>} 
        />
      </Router>
    } else if (this.state.songChosen) {
      console.log('in render game')
      return <Router>
        <Route exact path="/game"
          component={() => <Game fetchAnalysis={this.fetchAudioAnalysis} songAnalysis={this.state.currentSongAnalysis} gameLoaded={this.state.gameLoaded} song={this.state.chosenSong}/>}
        />
      </Router>
    }
  }

  handleChooseSongClick = (song) => {
    console.log('chosenSong', song)
    this.setState({chosenSong: song})
    this.songChosen()
  }
    

  render() {
    return (
      <div> 
        {this.renderWelcomeOrSongFinderOrGame()}
      </div>
    )
  }
}

export default Welcome

         