import './react-basics.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import O_Schedule from './react-basics/O_Schedule.jsx'

const events = [
  { date: '18 APR 2023', title: 'React workshop 09', isOn: true },
  { date: '18 APR 2023', title: 'React workshop 08', isOn: false }
]

const root = createRoot(document.getElementById('app'))
root.render(<O_Schedule events={events} />)
