import './A_Input.scss'
import React from 'react'

export default class A_Input extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()

    this.state = {
      value: ''
    }
  }

  // componentDidMount() {
  //   this.input.current.addEventListener('keydown', (e) => {
  //     if (e.key === 'Enter') {
  //       console.log('Enter')
  //     }
  //   })
  // }

  handleInput = () => {
    const { value } = this.input.current

    this.setState({
      value
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter')

      const { value } = this.state
      const { handleSearchSubmit } = this.props

      handleSearchSubmit(value)
    }
  }

  render() {
    const { value } = this.state

    return (
      <>
        <input
          className="A_Input"
          ref={this.input}
          value={value}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
        />
      </>
    )
  }
}
