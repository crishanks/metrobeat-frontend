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
    ev.preventDefault()
    this.setState({[ev.target.name]: ev.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={(ev) => this.props.fetchSongs(ev)}>
          <label>Search For a Song</label>
          <input name="searchInput" type="text" onChange={this.handleChange}/>
          <input type="submit" value="Search Song"/>
        </form>
      </div>
    )
  }
}

export default SearchBar