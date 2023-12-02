import React from 'react'
import { Route } from 'react-router'
import App from './components/dashboard'
// import About from './components/about'
const IndexPage = () => {
  return (
    <div>
      Welcome to Scrum Master
      <br />
      <a href="/scrum/story/1">Homepage</a>
    </div>
  )
}
const NotFoundPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <br />
      <a href="/scrum/story/1">Homepage</a>
    </div>
  )
}
export default (
  <Route>
    {/*use pid, storyid and sid to access project, story and task/> */}
    <Route
      path="/scrum/project/:pid/story/:sid/task/:tid"
      exact
      component={App}
    />
    <Route path="/scrum/story/:id/task/:tid" exact component={App} />
    <Route path="/scrum/story/:id" exact component={App} />
    {/* <Route path="/scrum/about" exact component={About} /> */}
    <Route exact path="/scrum" component={App} />
    <Route path="/scrum/*" exact component={NotFoundPage} />
    <Route exact path="*" component={IndexPage} />
  </Route>
)
