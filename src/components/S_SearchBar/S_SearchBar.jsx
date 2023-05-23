import './S_SearchBar.scss'
import React from 'react'
import { getPostTeasers } from '../../search_data.js'

import M_SearchForm from '../M_SearchForm/M_SearchForm.jsx'
import A_PostTeaser from '../A_PostTeaser/A_PostTeaser.jsx'

export default class S_SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSearchButtonDisabled: true,
      searchInputValue: '',
      postTeasers: []
    }
  }

  componentDidMount() {
    console.log('componentDidMount')

    getPostTeasers().then((data) => {
      this.setState({
        postTeasers: data
      })
    })
  }

  handleSearchInput = (searchInputValue) => {
    console.log('Input', searchInputValue)

    let isSearchButtonDisabled = true

    if (searchInputValue.length >= 3) {
      isSearchButtonDisabled = false
    }

    this.setState({
      isSearchButtonDisabled,
      searchInputValue
    })
  }

  handleSearchSubmit = () => {
    const { searchInputValue } = this.state

    if (searchInputValue.length >= 3) {
      console.log('Submit', searchInputValue)
    }
  }

  renderPostTeaser = () => {
    const { searchInputValue, postTeasers } = this.state
    const posts = []

    if (searchInputValue.length >= 3) {
      postTeasers.forEach((teaser) => {
        posts.push(<A_PostTeaser title={teaser.title} key={teaser.id} />)
      })
    }

    return <div className="C_PostTeasers">{posts}</div>
  }

  // {searchInputValue.length >= 3 ? renderPostTeaser() : ''}

  render() {
    const { searchInputValue, isSearchButtonDisabled } = this.state

    return (
      <div className="S_SearchBar">
        <M_SearchForm
          searchInputValue={searchInputValue}
          isSearchButtonDisabled={isSearchButtonDisabled}
          handleSearchInput={this.handleSearchInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />

        {searchInputValue.length >= 3 && this.renderPostTeaser()}
      </div>
    )
  }
}
