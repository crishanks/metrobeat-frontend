import React, {Component} from 'react'

import Player from '../Components/Player'
import BPM from '../Components/BPM'

let num1;
let num2;

class Game extends Component {
  constructor(props) {
    super(props)
  }

  handleBPMGuess = (guess) => {
    const songBPM = this.props.songAnalysis.track.tempo
    const difference = Math.abs((songBPM - guess)).toFixed()
    
    if (difference <= 20) {
      console.log('correct guess within 20', difference)
    } else {
      console.log('incorrect guess', difference)
    }
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
      </div>
    )
  }
}

export default Game 

