import './menubar.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { getSearchRequest } from './utilities.js'

import S_MenuBar from './components/S_MenuBar/S_MenuBar.jsx'

const addressPart = ':8080/'
// const addressPart = '.adc.ac/'

const menuItems = [
  {
    text: 'Element 1',
    url: 'spaceobjects.html'
  },
  {
    text: 'Element 2',
    url: 'spaceobjects/moon.html'
  },
  {
    text: 'Element 3',
    url: 'spaceships.html'
  },
  {
    text: 'Element 4',
    url: 'spaceships/buran.html'
  }
]

const menubar = document.createElement('div')
menubar.classList.add('S_MenuBar')
document.body.prepend(menubar)

const root = createRoot(menubar)

root.render(
  <S_MenuBar
    searchInputValue={getSearchRequest()}
    addressPart={addressPart}
    menuItems={menuItems}
  />
)
