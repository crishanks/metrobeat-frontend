import React, {Component} from 'react'

import Button from '../Components/Button'
import SearchBar from '../Components/SearchBar'
import Player from '../Components/Player'
import BPM from '../Components/BPM'

const usersAPI = 'http://localhost:3000/api/v1/users'
const playlistAPI = 'https://api.spotify.com/v1/me/playlists'
const devicesAPI = 'https://api.spotify.com/v1/me/player/devices'
const searchAPI = 'https://api.spotify.com/v1/search?q='
const audioAnalysisAPI = "https://api.spotify.com/v1/audio-analysis/"

class Game extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      playlists: [], 
      devices: [], 
      songs: [],
      currentSong: [],
      currentSongAnalysis: []
    }
  }

  componentDidMount = () => {
    // this.handleScriptLoad()
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
          'Authorization': 'Bearer ' + this.state.users[1].access_token
        }}
      )
      .then(res => res.json())
      .then(data => {
        this.setState({devices: data})
      })
    }

    fetchSongs = (ev) => {
      ev.preventDefault()
      const queryString = ev.target.searchInput.value
      return fetch(`${searchAPI + queryString}&type=track`, {
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": 'Bearer ' + this.state.users[1].access_token
        }
      })
      .then(results => {return results.json()})
      .then(json => {
        this.setState({
          songs: json,
          currentSong: json.tracks.items[0]
        })
      })
    }

    fetchAudioAnalysis = () => {
      console.log('current song id', this.state.currentSong.id)
      fetch(audioAnalysisAPI + this.state.currentSong.id, {
        headers: {
          'Authorization': 'Bearer ' + this.state.users[1].access_token
        }
      })
      .then(results => results.json())
      .then(json => {
        console.log('analysis', json)
        this.setState({currentSongAnalysis: json})
      })
    }

  render() {
    return (
      <div> 
        <Button />  
        <SearchBar user={this.state.users[1]} fetchSongs={this.fetchSongs} handleChange={this.handleChange} fetchSongAnalysis={this.fetchAudioAnalysis}/>
        <Player user={this.state.users[1]} song={this.state.currentSong}/>
        <BPM />
    </div>
    )
  }
}

export default Game 

