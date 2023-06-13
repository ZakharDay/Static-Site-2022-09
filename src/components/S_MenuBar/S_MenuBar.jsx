import './S_MenuBar.scss'
import React from 'react'
import { getPostTeasers } from '../../search_data.js'

import O_SearchBar from '../O_SearchBar/O_SearchBar.jsx'
import A_Link from '../A_Link/A_Link.jsx'

const addressPart = ':8080/'
// const addressPart = '.adc.ac/'

const menu = [
  {
    text: 'Element 1',
    url: 'spaceobjects.html'
  },
  {
    text: 'Element 2',
    url: 'spaceobjects/moon.html'
  },
  {
    text: 'Element 3',
    url: 'spaceships.html'
  },
  {
    text: 'Element 4',
    url: 'spaceships/buran.html'
  }
]

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
    const { searchInputValue } = this.state

    if (searchInputValue.length >= 3) {
      const url = this.getPathFromUrl(window.location.href)

      window.location.href =
        url + addressPart + 'search.html?request=' + searchInputValue
    }
  }

  render() {
    const { postTeasers, searchInputValue, isSearchButtonDisabled } = this.state
    const currentURL = window.location.href
    const homeURL = this.getPathFromUrl(currentURL) + addressPart

    const menuElements = []

    menu.forEach((menuItem, i) => {
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
