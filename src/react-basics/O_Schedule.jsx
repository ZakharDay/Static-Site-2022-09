import React, { Component } from 'react'
import A_Title from './A_Title.jsx'
import M_Card from './M_Card.jsx'

export default class O_Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = { clicks: 0 }
  }

  componentWillMount() {
    // подгрузить данные
    console.log('componentWillMount')
  }

  componentDidMount() {
    // что-то сделать другое
    console.log('componentDidMount')
  }

  handleClick = () => {
    console.log('Click')

    const { clicks } = this.state

    this.setState({
      clicks: clicks + 1
    })
  }

  render() {
    console.log('Render')
    const { events } = this.props
    const { clicks } = this.state

    console.log('events', events)

    const cards = events.map((event, i) => {
      return (
        <M_Card
          title={event.title}
          description={event.date}
          isOn={event.isOn}
          handleClick={this.handleClick}
          key={i}
        />
      )
    })

    return (
      <div className="O_Schedule">
        <A_Title text={'Schedule ' + clicks} />
        {cards}
      </div>
    )
  }
}
