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
      // .then(data => this.props.fetchSongAnalysis())
  }

  render() {
    return (
      <div>
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <label>Search For a Song</label>
          <input name="searchInput" type="text" onChange={this.handleChange}/>
          <input type="submit" value="Search Song"/>
        </form>
      </div>
    )
  }
}

export default SearchBar