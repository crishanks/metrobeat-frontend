import React, { Component } from 'react'
import SearchBar from '../Components/SearchBar';

const searchAPI = 'https://api.spotify.com/v1/search?q='
const audioAnalysisAPI = "https://api.spotify.com/v1/audio-analysis/"

class SongFinder extends Component {
  constructor() {
    super()
    this.state = {
      songChoice: '',
      songs: [],
      currentSongs: [],
      currentSongAnalysis: {}
    }
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
    return(
      <div>
        <SearchBar />
      </div>
    )
  }
}

export default SongFinder