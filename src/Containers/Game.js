import React, {Component} from 'react'

import Player from '../Components/Player'
import BPM from '../Components/BPM'
import Hint from '../Components/Hint'
import { userInfo } from 'os';

const addSongToPlaylistAPI = 'https://api.spotify.com/v1/playlists/'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guessedWrong: false,
      wantHelp: false,
      playAgain: false
    }
  }

  renderRightOrWrong = () => {
    if (this.state.guessedWrong && !this.state.playAgain) {
      return <div className="guess-message"><h3>Try Again!</h3></div>
    } else if (this.state.playAgain) {
      return <div className="guess-message">
        <h2>Correct!</h2>
        <h3>This song has been added to your MetroBeat Playlist</h3>
      <form action="http://localhost:3001/songfinder">
        <input className="link-button" type="submit" value="Play Again"/>
      </form>
    </div>
    }
  }

  // requestHelp = () => {
  //   this.setState({wantHelp: true})
  // }

  handleBPMGuess = (guess) => {
    const songBPM = this.props.songAnalysis.track.tempo
    const difference = Math.abs((songBPM - guess)).toFixed()
    
    if (difference <= 10) {
      console.log('correct guess within 20', difference)
      this.setState({playAgain: true})
      this.addSongToMetroBeatPlaylist()
    } else {
      console.log('incorrect guess', difference)
      this.setState({guessedWrong: true})
    }
  }

  addSongToMetroBeatPlaylist = () => {
    return fetch(`${addSongToPlaylistAPI + this.props.user.metro_beat_playlist_id}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.user.access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'uris': [this.props.song.uri]
      })
    })
    .then(data => this.renderRightOrWrong())
  }

  componentDidMount = () => {
    if (this.props.gameLoaded) {
      return
    } else {
      this.props.fetchAnalysis()
    }
  }

  render() {
    return (
      <> 
        <Player song={this.props.song} />
       <BPM analysis={this.props.songAnalysis} handleBPMGuess={this.handleBPMGuess}/>
       {this.renderRightOrWrong()}
      </>
    )
  }
}

export default Game 

