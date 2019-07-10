import React from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

const SongCard = (props) => {
  return(
    <NavLink to="/game" className="song-card">
    <div>
      <h3>{props.song.artists[0].name}</h3>
      <h5>{props.song.name}</h5>
    </div>
    <div>
      <img 
          src={props.song.album.images[0].url} alt="album cover"
          onClick={() => props.handleChooseSongClick(props.song)}
        />
    </div>
    </NavLink>
  )
}

export default SongCard
