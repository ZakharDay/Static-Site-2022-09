import React from 'react'
import O_LandingCategoryPreview from '../O_LandingCategoryPreview/O_LandingCategoryPreview.jsx'

export default class S_LandingContent extends React.Component {
  constructor(props) {
    super(props)

    console.log('props', props)
  }

  render() {
    const landingCategories = []
    const { categories } = this.props

    categories.forEach((category, i) => {
      landingCategories.push(<O_LandingCategoryPreview {...category} key={i} />)
    })

    return <>{landingCategories}</>
  }
}
