import React, {Component} from 'react'

class Game extends Component {

  componentDidMount() {
    debugger;
    const { song } = this.props.location
    console.log('in Game', song);
  }

  render() {
    return (
      <div> 
        <h1>
          WOW
        </h1>
    </div>
    )
  }
}

export default Game 

