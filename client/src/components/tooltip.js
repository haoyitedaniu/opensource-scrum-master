import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import AddTask from './forms/addTask'

class Tooltips extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      tooltipOpen: false,
    }

    //props.id: 1- backlog
    //          2- todo
    //          3- in progress
    //          4- done

    //props.placement: left, right, top, bottom
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    })
  }

  render() {
    return (
      <span>
        <i
          className="fas fa-question-circle"
          id={'Tooltip-' + this.props.id}
          data-toggle="tooltip"
        ></i>
        <Tooltip
          placement={this.props.placement}
          isOpen={this.state.tooltipOpen}
          target={'Tooltip-' + this.props.id}
          toggle={this.toggle}
        >
          {this.props.content}
        </Tooltip>

        <AddTask
          storyType={this.props.storyType}
          status={this.props.id}
          currentUserID={this.props.currentUserID}
          //add a task and with its initial status being id (1-backlog,2-todo,3-inprogress,4-done)
        />
      </span>
    )
  }
}
export default Tooltips
