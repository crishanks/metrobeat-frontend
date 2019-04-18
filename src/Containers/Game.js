import React, {Component} from 'react'

import Player from '../Components/Player'
import BPM from '../Components/BPM'
import Hint from '../Components/Hint'

const addSongToPlaylistAPI = 'https://api.spotify.com/v1/playlists/'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guessedWrong: false,
      wantHelp: false
    }
  }

  renderHint = () => {
    if (this.state.guessedWrong) {
      return <Hint />
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
      this.addSongToMetroBeatPlaylist()
    } else {
      console.log('incorrect guess', difference)
      this.setState({guessedWrong: true})
    }
  }

  addSongToMetroBeatPlaylist = () => {
    console.log('in add song')
    fetch(addSongToPlaylistAPI, {

    })
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
      <div> 
       <Player song={this.props.song} />
       <BPM analysis={this.props.songAnalysis} handleBPMGuess={this.handleBPMGuess}/>
       {this.renderHint()}
      </div>
    )
  }
}

export default Game 

