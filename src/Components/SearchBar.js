import React, { Component } from 'react'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchInput: {},
      songs: []
    }
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.fetchSongs(ev)
    .then(data => {this.props.handleSearchSongClick()})
  }

  render() {
    return (
      <>
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <label>Search For a Song  </label>
          <input className="search-input" name="searchInput" type="text" onChange={this.handleChange}/>
          <input className="link-button" type="submit" value="Let's Boogie"/>
        </form>
      </>
    )
  }
}

export default SearchBar