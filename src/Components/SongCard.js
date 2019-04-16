import React from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

const SongCard = (props) => {
  console.log('song card props', props)
  return(
    <Link to={{
      pathname: "/game",
      state: { song: props.song }
    }}>

          <div onClick={() => props.handleChooseSongClick(props.song, true)}>
            <h3>{props.song.artists[0].name}</h3>
            <h5>{props.song.name}</h5>
            <img src={props.song.album.images[0].url} alt="album cover"/>
          </div>
    </Link>
  )
}

export default SongCard