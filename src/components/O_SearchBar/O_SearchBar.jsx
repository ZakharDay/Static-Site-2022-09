import './O_SearchBar.scss'
import React from 'react'

import M_SearchForm from '../M_SearchForm/M_SearchForm.jsx'
import M_PostSuggestion from '../M_PostSuggestion/M_PostSuggestion.jsx'

export default class O_SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  renderPostSuggestions = () => {
    const { postTeasers } = this.props
    const searchInputValue = this.props.searchInputValue.toLowerCase()
    const posts = []

    postTeasers.forEach((postTeaser) => {
      const nbspRegex = /[\u202F\u00A0]/gm
      const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm

      const title = postTeaser.title
        .replaceAll(nbspRegex, ' ')
        .replaceAll(punctuationRegex, '')
        .toLowerCase()

      const description = postTeaser.description
        .replaceAll(nbspRegex, ' ')
        .replaceAll(punctuationRegex, '')
        .toLowerCase()

      if (
        title.includes(searchInputValue) ||
        description.includes(searchInputValue)
      ) {
        const { title, description, url, id } = postTeaser

        posts.push(
          <M_PostSuggestion
            title={title}
            description={description}
            url={url}
            key={id}
          />
        )
      }
    })

    return <div className="C_PostSuggestions">{posts}</div>
  }

  render() {
    const {
      searchInputValue,
      isSearchButtonDisabled,
      handleSearchInput,
      handleSearchSubmit
    } = this.props

    return (
      <div className="O_SearchBar">
        <M_SearchForm
          searchInputValue={searchInputValue}
          isSearchButtonDisabled={isSearchButtonDisabled}
          handleSearchInput={handleSearchInput}
          handleSearchSubmit={handleSearchSubmit}
        />

        {searchInputValue.length >= 3 &&
          !isSearchButtonDisabled &&
          this.renderPostSuggestions()}
      </div>
    )
  }
}
