import React, { Component } from 'react'
import moment from 'moment'
// import ModalExampleDimmer from './modal'
import UpdateTaskModal from './forms/updateTaskModal'

import axios from 'axios'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import Loader from './loader'
class Tasks extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      currentUserID: '',
    }
  }

  componentDidMount() {
    if (this.props.currentUserID) {
      this.setState({ currentUserID: this.props.currentUserID })
    } else {
      this.setState({ currentUserID: '' })
    }
  }

  componentWillReceiveProps() {
    $('.mcell-task').draggable({
      appendTo: 'body',
      cursor: 'move',
      helper: 'clone',
      revert: 'invalid',
    })
    // const that = this //this make sure that we can access the class context using that
    // $('.mcell').droppable({
    //   tolerance: 'intersect',
    //   accept: '.mcell-task',
    //   activeClass: 'ui-state-default',
    //   hoverClass: 'ui-state-hover',
    //   drop: function (event, ui) {
    //     // here we wil make sure it can check if user is logged in
    //     const currentUserID = that.props.currentUserID || ''
    //     if (!currentUserID || currentUserID === '') {
    //       alert('you must login first')
    //       return
    //     } else {
    //       $(this).append($(ui.draggable)) //here $(this) is context from jquery
    //     }
    //     console.log($(this).find('li').attr('id'))
    //     //get the task id
    //     //then we can also get the status of the task, and then update it to the
    //     //database
    //     //now lets find the
    //     // console.log('this is parent id', $(this).parent().className())
    //     // console.log($(this).parentsUntil('col-sm mcell').attr('id'))
    //   },
    // })
  }
  api = (id) => {
    let yesno = prompt('Please enter yes to continue to delete this task')
    if (yesno && yesno.toLowerCase() === 'yes') {
      axios
        .delete('/scrum/api/tasks/delete/' + id)
        .then(function (response) {
          if (response.status === '1') alert('ok')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  showTask = (i, index) => {
    //render task i
    return (
      <li id={i._id} className="mcell-task" key={index}>
        <span className="task-name">
          <span>{i.title}</span>
          <i
            id="delete"
            className="fas fa-times"
            onClick={() => this.api(i._id)}
          ></i>
        </span>
        <span className="task-details">{i.content}</span>
        <div>
          <span className="task-due">
            {'Due Date: ' + moment(i.dueDate).format('DD.MM.YYYY')}
          </span>
          <span className="task-contributors">
            <img
              alt={i.contributors[0].name + ' ' + i.contributors[0].lastName}
              title={i.contributors[0].name + ' ' + i.contributors[0].lastName}
              src={'/assets/img/' + i.contributors[0].profilePhoto}
            />
          </span>
        </div>
        <div className={i.color} />
        <UpdateTaskModal
          currentUserID={this.props.currentUserID}
          propContent={i}
          classType="btnDashboard"
        />
        {/* {this.showEditTask(i)} */}
      </li>
    )
  }

  render() {
    const { tasks, loading, filter } = this.props
    let content
    if (loading) {
      content = (
        <div className="loader">
          <Loader />
        </div>
      )
    } else {
      content = tasks
        .filter((i) => i.status === Number(filter))
        .map((i, index) => {
          return this.showTask(i, index)
        })
    }
    return <div className="process">{content}</div>
  }
}
export default Tasks
