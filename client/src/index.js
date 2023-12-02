import React from 'react'
import ReactDOM from 'react-dom'

import { Router, browserHistory } from 'react-router'
import routes from './routes'
const basename = process.env.REACT_APP_BASENAME || null
ReactDOM.render(
  <Router basename={basename} history={browserHistory} routes={routes} />,
  document.getElementById('root')
)
