import React from 'react'
import { Route } from 'react-router'
import App from './components/dashboard'
// import About from './components/about'
const IndexPage = () => {
  // REACT_APP_BASENAME=/master   //deploy under /master
  // REACT_APP_BASENAME=          //deploy under / (by default)

  const basename = process.env.REACT_APP_BASENAME || '' // scrum / api / story
  return (
    <div>
      Welcome to Scrum Master
      <br />
      <a href={`${basename}/story/1`}>Homepage</a>
    </div>
  )
}
const NotFoundPage = () => {
  const basename = process.env.REACT_APP_BASENAME || '' // scrum / api / story
  return (
    <div>
      <h2>Not Found</h2>
      <br />
      <a href={`${basename}/story/1`}>Homepage</a>
    </div>
  )
}
const basename = process.env.REACT_APP_BASENAME || ''
// const Routes = () => {
//   return (
//     <Route>
//       {/*use pid, storyid and sid to access project, story and task/> */}
//       <Route path="/project/:pid/story/:sid/task/:tid" exact component={App} />
//       <Route path="/story/:id/task/:tid" exact component={App} />
//       <Route path="/story/:id" exact component={App} />
//       <Route exact path="/" component={App} />
//       <Route path="/*" exact component={NotFoundPage} />
//       <Route exact path="*" component={IndexPage} />
//     </Route>
//   )
// }
// export default Routes

export default (
  <Route>
    {/*use pid, storyid and sid to access project, story and task/> */}
    <Route path={`${basename}/project/:pid/story/:sid/task/:tid`} exact component={App} />
    <Route path={`${basename}/story/:id/task/:tid`} exact component={App} />
    <Route path={`${basename}/story/:id`} exact component={App} />
    {/* <Route path="/scrum/about" exact component={About} /> */}
    <Route exact path={`${basename}`} component={App} />
    <Route path={`${basename}/*`} exact component={NotFoundPage} />
    <Route exact path={`*`} component={IndexPage} />
  </Route>
)
