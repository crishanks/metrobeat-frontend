import React, {Component} from 'react'

import Button from '../Components/Button'
import SearchBar from '../Components/SearchBar'
import Player from '../Components/Player'

const usersAPI = 'http://localhost:3000/api/v1/users'
const playlistAPI = 'https://api.spotify.com/v1/me/playlists'
const devicesAPI = 'https://api.spotify.com/v1/me/player/devices'
const searchAPI = 'https://api.spotify.com/v1/search?q='

class Game extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      playlists: [], 
      devices: [], 
      songs: []
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
      console.log('fetching devices')
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
      
      const queryString = this.state.searchInput
      fetch(`${searchAPI + queryString}&type=track`, {
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          "Authorization": 'Bearer ' + this.state.users[1].access_token
        }
      })
      .then(results => {return results.json()})
      .then(json => {
        this.setState({songs: json})
      })
    }

  // componentDidMount = () => {
  //   this.handleScriptLoad()
  // }

  // handleScriptLoad = () => {
    
  //   return new Promise(resolve => {
  //     if (window.Spotify) {
  //       resolve();
  //     } else {
  //       window.onSpotifyWebPlaybackSDKReady = resolve;
  //     }
  //   });
  // }

  render() {
    return (
      <div> 
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <script>{
          window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQCMTKmxgV2iRM6IZZ1p6jOdBUHYWhdYuhs-X35nl0Mhj1bx5Ch4WASq-lv1mQf0p__6deTdSQfxEjgIhouBP2hfYYjDIX7PfJ_3d6HsbQDPqFW2MuR9d7fIWcMpvuByMTLei4kkK7_Oy7F8ocXVu3hPYJ7javxy5-Q_';
            const player = new window.Spotify.Player({
              name: 'Web Playback SDK Quick Start Player',
              getOAuthToken: cb => { cb(token); }
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect();
          }
        }</script>

        <Button />  
        <SearchBar user={this.state.users[1]} fetchSongs={this.fetchSongs}/>
        <Player user={this.state.users[1]} songs={this.state.songs}/>

    </div>
    )
  }
}

export default Game 

