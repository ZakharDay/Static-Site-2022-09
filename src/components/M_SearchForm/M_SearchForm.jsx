import './M_SearchForm.scss'
import React from 'react'

import A_Input from './../A_Input/A_Input.jsx'
import A_Button from './../A_Button/A_Button.jsx'

export default class M_SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  render() {
    const {
      searchInputValue,
      isSearchButtonDisabled,
      handleSearchInput,
      handleSearchSubmit
    } = this.props

    return (
      <div className="M_SearchForm">
        <A_Input
          value={searchInputValue}
          placeholder="Search posts"
          handleInput={handleSearchInput}
          handleSubmit={handleSearchSubmit}
        />

        <A_Button
          text="Search"
          disabled={isSearchButtonDisabled}
          handleClick={handleSearchSubmit}
        />
      </div>
    )
  }
}
