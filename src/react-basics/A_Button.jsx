import classnames from 'classnames'
import React from 'react'

export default class A_Button extends React.Component {
  render() {
    const { isOn } = this.props

    const classes = classnames({
      A_Button: true,
      active: isOn
    })

    return (
      <div className={classes} onClick={this.props.handleClick}>
        {this.props.text}
      </div>
    )
  }
}
