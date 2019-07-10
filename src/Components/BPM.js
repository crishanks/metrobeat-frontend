import React, { Component } from 'react'

class BPM extends Component {
  constructor() {
    super()
    this.state = {
      guess: ''
    }
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.handleBPMGuess(this.state.guess)
  }

  render() {

    return (
      <div className="bpm-box">
        <form onSubmit={(ev) => {this.handleSubmit(ev)}}>
          <label>Guess the BPM</label>
          <input className="search-input" name="guess" type="text" value={this.state.guess} onChange={(ev) => this.handleChange(ev)}/>
          <input className="link-button" type="submit" value="Get It!"/>
        </form>
      </div>
    )
  }
}

export default BPM