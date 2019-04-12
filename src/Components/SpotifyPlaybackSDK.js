import React, {Component} from 'react'

class SpotifyPlaybackSDK extends Component {

  render() {
    return (
      <div> 
        {/* <h2>SDK is present and hopefully playing</h2>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <script>{
          window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQAvgJboF1DqWNjOyNyIvI7Skur4dYuJ9Gko-UmM3tk6nAGmI8v9YzTs2-zV1MjrXDtsWDQ_p4AyMRX8tMBOSHR_F-ADHXgfRhjMn4TDuI-z_r5L-lcRFLeFWm8ewnK3dCx1-FdeQG871QwQT9UO1BdqVBH3QznFDuBL';
            const player = new Spotify.Player({
              name: 'Web Playback SDK Quick Start Player',
              getOAuthToken: cb => { cb(token); }
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect();
          }
        }</script> */}
      </div>
    )
  }
}

export default SpotifyPlaybackSDK