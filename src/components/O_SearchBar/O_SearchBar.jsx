import './O_SearchBar.scss'
import React from 'react'

import A_Input from './../A_Input/A_Input.jsx'

export default class O_SearchBar extends React.Component {
  handleSearchSubmit = (value) => {
    console.log('Submit', value)
  }

  render() {
    return (
      <div className="O_SearchBar">
        <A_Input handleSearchSubmit={this.handleSearchSubmit} />
      </div>
    )
  }
}
