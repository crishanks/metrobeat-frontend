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
      <div>
        <form onSubmit={(ev) => {this.handleSubmit(ev)}}>
          <label>Guess the BPM</label>
          <input name="guess" type="text" value={this.state.guess} onChange={(ev) => this.handleChange(ev)}/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default BPM