import './searchbar.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import S_SearchBar from './components/S_SearchBar/S_SearchBar.jsx'

const root = createRoot(document.querySelector('.S_MenuBar .W_Search'))
root.render(<S_SearchBar />)
