import React from 'react'
import { createRoot } from 'react-dom/client'
import { getHomepageTeasers } from './search_data.js'
import { formatData } from './index_props.js'

import S_LandingContent from './components/S_LandingContent/S_LandingContent.jsx'

document.addEventListener('DOMContentLoaded', () => {
  getHomepageTeasers().then((data) => {
    const categories = formatData(data)

    const menubar = document.querySelector('.S_LandingContent')
    menubar.innerHTML = ''

    const root = createRoot(menubar)

    const props = {
      categories
    }

    root.render(<S_LandingContent styles={styles} {...props} />)
  })
})
