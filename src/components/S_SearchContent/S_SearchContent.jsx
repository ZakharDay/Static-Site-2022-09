import './S_SearchContent.scss'
import React from 'react'
import { getPostTeasers } from '../../search_data.js'

import M_PostTeaser from '../M_PostTeaser/M_PostTeaser.jsx'

export default class S_SearchContent extends React.Component {
  constructor(props) {
    super(props)

    const { searchInputValue } = props

    this.state = {
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

  renderPostTeasers = () => {
    const { postTeasers } = this.state
    const searchInputValue = this.state.searchInputValue.toLowerCase()
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
        const { title, description, tags, image, url, id } = postTeaser

        posts.push(
          <M_PostTeaser
            title={title}
            description={description}
            image={image}
            tags={tags}
            url={url}
            key={id}
          />
        )
      }
    })

    return posts
  }

  render() {
    return <div className="S_SearchContent">{this.renderPostTeasers()}</div>
  }
}
