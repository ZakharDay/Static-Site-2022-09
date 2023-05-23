import './A_PostTeaser.scss'
import React from 'react'

export default class A_PostTeaser extends React.Component {
  render() {
    const { title } = this.props

    return <div className="A_PostTeaser">{title}</div>
  }
}
