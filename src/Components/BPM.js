import React, { Component } from 'react'

class BPM extends Component {
  render() {
    return (
      <div>
        <label>Guess the BPM</label>
        <input type="text"/>
        <input type="submit" value="submit"/>
      </div>
    )
  }
}

export default BPM