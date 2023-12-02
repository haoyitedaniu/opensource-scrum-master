import React, { Component } from 'react'
import Tasks from './tasks'
import Tooltips from './tooltip'
// import axios from 'axios'
export default class Story extends Component {
  // constructor(props, context) {
  //   super(props, context)
  //   this.state = {
  //     content: '',
  //   }
  // }
  componentWillMount() {}

  async componentDidMount() {
    // if (this.props.story[0])
    //   this.setState({ content: this.props.story[0].content })
  }

  render() {
    // if (this.props.story[0])
    //   console.log('this is the story content', this.props.story[0].content)
    return (
      <div className="container">
        {/* {this.props.story[0] ? ( */}
        <div className="space">
          <h2 className="story">
            {this.props.story[0] ? this.props.story[0].title : 'Loading...'}
          </h2>
          <textarea
            style={{ width: '100%' }}
            value={
              this.props.story[0] ? this.props.story[0].content : 'Loading...'
            }
            onChange={() => {}}
          ></textarea>
        </div>
        {/* // ) : (
        //   <div className="space">
        //     <h2 className="story">
        //       Welcome to Scrum Master, Please choose or add stories.
        //     </h2>
        //   </div>
        // )} */}
        {this.props.story[0] && (
          <div className="row">
            <div className="col-sm mcell mcolor1">
              <div className="mcell-title story">
                <b className="fas fa-lightbulb" /> Backlog
                <Tooltips
                  id="1" //Status of task is Backlog
                  content="You can do what you want to do with this column"
                  placement="top"
                  storyType={this.props.storyType}
                  currentUserID={this.props.currentUserID}
                />
              </div>
              <Tasks //show all the tasks of this status (Backlog)
                // id="backlog"
                tasks={this.props.tasks}
                loading={this.props.loading}
                filter="1" //Status of task is Backlog
                currentUserID={this.props.currentUserID || ''}
                // onTaskUpdated={() => {
                //   this.props.onStoryTasksUpdated()
                // }}
              />
            </div>
            <div className="col-sm mcell mcolor2">
              <div className="mcell-title story">
                <b className="fas fa-bars" /> TODO
                <Tooltips
                  id="2" //Status of task is Todo
                  content="You can do what you want to do with this column"
                  placement="top"
                  storyType={this.props.storyType}
                  currentUserID={this.props.currentUserID}
                />
              </div>
              <Tasks //show all the tasks of this status (TODO)
                // id="todo"
                tasks={this.props.tasks}
                loading={this.props.loading}
                filter="2" //Status of task is Todo
                currentUserID={this.props.currentUserID || ''}
                // onTaskUpdated={() => {
                //   this.props.onStoryTasksUpdated()
                // }}
              />
            </div>

            <div className="col-sm mcell mcolor3">
              <div className="mcell-title story">
                <b className="fas fa-spinner"></b> In Progress
                <Tooltips
                  id="3" // status of task is in progress
                  content="You can do what you want to do with this column"
                  placement="top"
                  storyType={this.props.storyType}
                  currentUserID={this.props.currentUserID}
                />{' '}
              </div>
              <Tasks //show all the tasks of this status (In Progress)
                // id="inprogress"
                tasks={this.props.tasks}
                loading={this.props.loading}
                filter="3" // status of task is in progress
                currentUserID={this.props.currentUserID || ''}
                // onTaskUpdated={() => {
                //   this.props.onStoryTasksUpdated()
                // }}
              />
            </div>
            <div className="col-sm mcell mcolor4">
              <div className="mcell-title story">
                <b className="fas fa-check" /> Done
                <Tooltips
                  id="4" // status of task is Done
                  content="You can do what you want to do with this column"
                  placement="top"
                  storyType={this.props.storyType}
                  currentUserID={this.props.currentUserID}
                />{' '}
              </div>
              <Tasks //show all the tasks of this status (Done)
                // id="done"
                tasks={this.props.tasks}
                loading={this.props.loading}
                filter="4" // status of task is Done
                currentUserID={this.props.currentUserID || ''}
                // onTaskUpdated={() => {
                //   this.props.onStoryTasksUpdated()
                // }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
