import React, {Component} from 'react'

class Game extends Component {


  render() {
    return (
      <div> 
        <Player user={this.state.users[1]} song={this.state.currentSong}/>
        <BPM />
    </div>
    )
  }
}

export default Game 

