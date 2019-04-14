import React, { Component } from 'react'

const searchAPI = 'https://api.spotify.com/v1/search?q='
class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchInput: {},
      songs: []
    }
  }

  fetchSongs = (ev) => {
    ev.preventDefault()
    
    const queryString = this.state.searchInput
    // const searchParams = {
    //   header: {
    //     "Accept": 'application/json',
    //     "Content-Type": 'application/json',
    //     "Authorization": 'Bearer ' + this.props.user.access_token
    //   }
    // }
    // console.log(`${searchAPI + queryString}&type=track`)
    fetch(`${searchAPI + queryString}&type=track`, {
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + this.props.user.access_token
      }
    })
    .then(results => {return results.json()})
    .then(json => {
      console.log('json', json)
    })
  }

  handleChange = (ev) => {
    ev.preventDefault()
    this.setState({[ev.target.name]: ev.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.fetchSongs}>
          <label>Search For a Song</label>
          <input name="searchInput" type="text" onChange={this.handleChange}/>
          <input type="submit" value="Search Song"/>
        </form>
      </div>
    )
  }
}

export default SearchBar