import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  play = () => ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };
  
  render() {
    return (
      <div>
      <button>Placeholder Button for Play</button>
        {/* <button onClick={this.play({
          playerInstance: new window.Spotify.Player({ name: "..." }),
          spotify_uri: this.props.songs.tracks.items[0].uri,
          })}
        /> */}
        
      </div>
    )
  }
}

export default Player