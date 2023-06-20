import React from 'react'
import { getPostTeasers } from '../../search_data.js'

import O_SearchBar from '../O_SearchBar/O_SearchBar.jsx'
import A_Link from '../A_Link/A_Link.jsx'

export default class S_MenuBar extends React.Component {
  constructor(props) {
    super(props)

    const { searchInputValue } = props

    this.state = {
      isSearchButtonDisabled: true,
      postTeasers: [],
      searchInputValue
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

  getPathFromUrl = (url) => {
    const { addressPart } = this.props
    return url.split(addressPart)[0]
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
    const { prerender, homeURL } = this.props
    const { searchInputValue } = this.state

    if (!prerender) {
      if (searchInputValue.length >= 3) {
        window.location.href =
          homeURL + 'search.html?request=' + searchInputValue
      }
    }
  }

  render() {
    const { prerender, homeURL, menuItems } = this.props
    const { postTeasers, searchInputValue, isSearchButtonDisabled } = this.state
    const currentURL = !prerender ? window.location.href : ''

    const menuElements = []

    menuItems.forEach((menuItem, i) => {
      const linkURL = homeURL + menuItem.url

      menuElements.push(
        <A_Link
          type="mainMenu"
          text={menuItem.text}
          url={linkURL}
          active={linkURL == currentURL ? true : false}
          key={i}
        />
      )
    })

    return (
      <>
        <A_Link
          type="Logo"
          text="Home"
          url={homeURL}
          active={homeURL == currentURL ? true : false}
        />

        <div className="C_MainMenu">{menuElements}</div>

        <O_SearchBar
          postTeasers={postTeasers}
          searchInputValue={searchInputValue}
          isSearchButtonDisabled={isSearchButtonDisabled}
          handleSearchInput={this.handleSearchInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />
      </>
    )
  }
}
