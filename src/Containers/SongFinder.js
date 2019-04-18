import React, { Component } from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import SearchBar from '../Components/SearchBar'
import SongCard from '../Components/SongCard'
import Game from '../Containers/Game'

const searchAPI = 'https://api.spotify.com/v1/search?q='

class SongFinder extends Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      allSongCards: []
    }
  }

  fetchSongs = (ev) => {
    ev.preventDefault()
    const queryString = ev.target.searchInput.value
    return fetch(`${searchAPI + queryString}&type=track`, {
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + this.props.state.users[1].access_token
      }
    })
    .then(results => {return results.json()})
    .then(json => {
      this.setState({
        songs: json
      })
    })
  }

  handleSearchSongClick = () => {
    let allSongCards = []
    for (let i = 0; i < 3; i++) {
      const currentSong = this.state.songs.tracks.items[i]
      console.log('currentSong', currentSong)
      allSongCards.push(<SongCard song={currentSong} key={i} handleChooseSongClick={this.props.handleChooseSongClick}/>)
    }
    console.log('allsongcards', allSongCards)
    this.setState({
      allSongCards: allSongCards
    }, () => console.log(this.state.allSongCards))
  }

  renderSongCards = () => {
    if (this.state.allSongCards.length > 0) {
      return this.state.allSongCards
    } else {
      return null
    }
  }

  render() {
    return(
      <div className="song-finder">
        <SearchBar 
          fetchSongs={this.fetchSongs} 
          handleSearchSongClick={this.handleSearchSongClick}
        />
        {this.renderSongCards()} 
      </div>
    )
  }
}

export default SongFinder