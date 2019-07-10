import React, { Component } from 'react'
import SpotifyPlayer from 'react-spotify-player'

const size = {
  width: '100%',
  height: 300,
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'

class Player extends Component {  
  render() {
    return (
      <div className='player-container'>
        <div className="media-player">
          <SpotifyPlayer
          uri={this.props.song.uri}
          size={size}
          view={view}
          theme={theme}
          />
        </div>
      </div>
    )
  }
}

export default Player