import React, { Component } from 'react'
import A_Title from './A_Title.jsx'
import A_Button from './A_Button.jsx'

export default class M_Card extends Component {
  render() {
    return (
      <div className="M_Card">
        <A_Title text={this.props.title} />
        <p>{this.props.description}</p>

        <A_Button
          text="Apply"
          isOn={this.props.isOn}
          handleClick={this.props.handleClick}
        />
      </div>
    )
  }
}
