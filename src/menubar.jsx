import React from 'react'
import { createRoot } from 'react-dom/client'
import { getSearchRequest } from './utilities.js'
import { homeURL, menuItems } from './menubar_props.js'

import S_MenuBar from './components/S_MenuBar/S_MenuBar.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const menubar = document.querySelector('.S_MenuBar')
  menubar.innerHTML = ''

  // document.querySelector('.S_MenuBar').remove()
  // const menubar = document.createElement('div')
  // menubar.classList.add('S_MenuBar')
  // document.body.prepend(menubar)

  const root = createRoot(menubar)

  const props = {
    searchInputValue: getSearchRequest(),
    homeURL,
    menuItems
  }

  root.render(<S_MenuBar {...props} />)
})
