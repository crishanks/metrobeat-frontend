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
      gameLoaded: false,
      newPlaylistData: {}
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
    if (!this.state.users[1].has_metro_beat_playlist) {
      console.log('creating playlist')
      let url = `https://api.spotify.com/v1/users/${this.state.users[1].spotify_id}/playlists`
      return fetch(url, {
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
        console.log('newPlaylistData create playlist', data)
        this.setState({
          newPlaylistData: data
        })
      })
      .then(data => {this.updateUserHasMetroBeatPlaylist()})
      // .then(data => {this.fetchDevices()})
    }
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

  updateUserHasMetroBeatPlaylist = () => {
    console.log('in update hmbp')
    return fetch(usersAPI + '/' + this.state.users[1].id, {
      method: 'PATCH',
      headers: {
        'Attributes': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        has_metro_beat_playlist: true,
        metro_beat_playlist_id: this.state.newPlaylistData.id
      })
    })
    .then(data => {this.fetchUser()})
  }

  // fetchDevices = () => {
  //   fetch(devicesAPI, {
  //     headers: {
  //       'Authorization': 'Bearer ' + this.state.users[1].access_token
  //     }}
  //   )
  //   .then(res => res.json())
  //   .then(data => {
  //     this.setState({devices: data})
  //   })
  // }

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
        <div className="welcome-message-container">
          <h3 className="message">Gamify Your Playlist</h3>
          <Button />
        </div>
      )
    } else if (this.state.isLoggedIn && !this.state.songChosen) {
      return <Router>
        <Route exact path="/"
          component={() => <Button />} 
        />
        <Route exact path="/songfinder"
          component={() => <SongFinder 
          state={this.state}
          songChosen={this.songChosen} 
          handleChooseSongClick={this.handleChooseSongClick}/>} 
        />
      </Router>
    } else if (this.state.songChosen) {
      console.log('in render game')
      return <Router>
        <Route exact path="/game"
          component={() => <Game 
          fetchAnalysis={this.fetchAudioAnalysis} 
          songAnalysis={this.state.currentSongAnalysis} 
          gameLoaded={this.state.gameLoaded} 
          song={this.state.chosenSong}
          user={this.state.users[1]}
          />}
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
      <>
        {this.renderWelcomeOrSongFinderOrGame()}
      </>
    )
  }
}

export default Welcome

         