import React from 'react'

import A_Image from '../A_Image/A_Image.jsx'
import A_Text from '../A_Text/A_Text.jsx'

export default class M_LandingPostTeaser extends React.Component {
  render() {
    const { title, image, url } = this.props

    return (
      <a className="M_LandingPostTeaser" href={url}>
        <A_Image type="postTeaser" src={image} />
        <A_Text text={title} type="h3" />
      </a>
    )
  }
}
