import React from 'react'
import M_LandingPostTeaser from '../M_LandingPostTeaser/M_LandingPostTeaser.jsx'

export default class O_LandingCategoryPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, posts } = this.props
    const landingCategoryPostTeasers = []

    posts.forEach((post, i) => {
      console.log(post)
      landingCategoryPostTeasers.push(<M_LandingPostTeaser {...post} key={i} />)
    })

    return (
      <div className="O_LandingCategoryPreview">
        <h2>{name}</h2>

        <div className="C_LandingCategoryPostTeasers">
          {landingCategoryPostTeasers}
        </div>
      </div>
    )
  }
}
