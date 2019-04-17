import React, { Component } from 'react'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import Button from '../Components/Button'
import SongFinder from '../Containers/SongFinder'
import Game from '../Containers/Game'

const usersAPI = 'http://localhost:3000/api/v1/users'
const playlistAPI = 'https://api.spotify.com/v1/me/playlists'
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
      return <Button />
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

         