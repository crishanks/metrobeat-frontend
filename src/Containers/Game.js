import React, {Component} from 'react'

class Game extends Component {

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
        <h1>Inside Game</h1>
    </div>
    )
  }
}

export default Game 

