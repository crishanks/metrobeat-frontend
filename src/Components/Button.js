import React, { Component } from 'react'

class Button extends Component {
  render() {
    return (
      <a className="link-button" href="http://localhost:3000/api/v1/login">
      Log in with Spotify
      </a>
    )
  }
}

export default Button