const { TextEncoder } = require('util')
global.TextEncoder = TextEncoder

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { homeURL, menuItems } = require('./menubar_props.js')

const S_MenuBar = require('./components/S_MenuBar/S_MenuBar.jsx').default

const props = {
  prerender: true,
  searchInputValue: '',
  homeURL,
  menuItems
}

const menubar = ReactDOMServer.renderToString(
  React.createElement(S_MenuBar, props)
)

export { menubar }
