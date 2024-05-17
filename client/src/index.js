import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
// const basename = process.env.REACT_APP_BASENAME || null

/* Turns URL path into router basename by removing everything after the first slash
 * @param {string} path URL path, probably window.location.pathname
 * @returns {string} final basename
 */
const basename = process.env.REACT_APP_BASENAME || ''

// const rootContainer = document.getElementById('root')
//old code
//Initial render
// ReactDOM.render(<App name="Saeloun blog" />, rootContainer)
// ReactDOM.render(<App name="Saeloun testimonials" />, rootContainer)
ReactDOM.render(
  // <BrowserRouter basename={basename}>
  // <Router history={browserHistory} routes={Routes} />,
  // </BrowserRouter>,
  // rootContainer

  <Router basename={basename} history={browserHistory} routes={Routes} />,
  document.getElementById('root')
)

// new code with createRoot from react-dom@18.2
// const root = ReactDOM.createRoot(rootContainer) // Create a root.
// // root.render(<App name="Saeloun blog" />) // Initial render
// // root.render(<App name="Saeloun testimonials" />) // During an update, there is no need to pass the container again

// root.render(
//   <BrowserRouter basename={basename}>
//     {/* if basename == '/app  then <Route Path='/'> will render at /app */}
//     <Router history={browserHistory} routes={Routes} />,
//   </BrowserRouter>
// )
