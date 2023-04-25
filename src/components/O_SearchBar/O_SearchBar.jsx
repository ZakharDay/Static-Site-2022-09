import './O_SearchBar.scss'
import React from 'react'

import M_SearchForm from './../M_SearchForm/M_SearchForm.jsx'

export default class O_SearchBar extends React.Component {
  handleSearchSubmit = (value) => {
    console.log('Submit', value)
  }

  render() {
    return (
      <div className="O_SearchBar">
        <M_SearchForm handleSearchSubmit={this.handleSearchSubmit} />
      </div>
    )
  }
}
