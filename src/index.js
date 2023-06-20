import query from 'static-source-data/query'
import { formatData } from './index_props.js'
const indexData = query('indexData')

const React = require('react')
const ReactDOMServer = require('react-dom/server')

const S_LandingContent =
  require('./components/S_LandingContent/S_LandingContent.jsx').default

const props = {
  categories: formatData(indexData)
}

const content = ReactDOMServer.renderToString(
  React.createElement(S_LandingContent, props)
)

export { content }
