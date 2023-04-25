import './O_SearchBar.scss'
import React from 'react'
import { getPostTeasers } from '../../search_data.js'

import M_SearchForm from '../M_SearchForm/M_SearchForm.jsx'

export default class S_SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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

  handleSearchSubmit = (value) => {
    console.log('Submit', value)
  }

  render() {
    console.log('Post Teasers', this.state.postTeasers)

    const posts = []

    this.state.postTeasers.forEach((teaser) => {
      posts.push(<div className="postTeaser">{teaser.title}</div>)
    })

    return (
      <div className="S_SearchBar">
        <M_SearchForm handleSearchSubmit={this.handleSearchSubmit} />

        {posts}
      </div>
    )
  }
}
