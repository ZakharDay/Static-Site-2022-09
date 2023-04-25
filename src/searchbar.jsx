import './searchbar.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { getPostTeasers } from './search_data.js'

import O_SearchBar from './components/O_SearchBar/O_SearchBar.jsx'

getPostTeasers().then((data) => {
  const root = createRoot(document.querySelector('.S_MenuBar .W_Search'))
  root.render(<O_SearchBar postTeasers={data} />)
})
