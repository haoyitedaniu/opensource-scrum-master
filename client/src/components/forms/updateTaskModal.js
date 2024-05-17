import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from 'reactstrap'
import moment from 'moment'
import axios from 'axios'
class UpdateTaskModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      title: this.props.propContent.title,
      content: this.props.propContent.content,
      status: this.props.propContent.status,
      color: this.props.propContent.color,
      dueDate: this.props.propContent.dueDate,
      contributors: this.props.propContent.contributors[0]._id, //by default we just list the ids
      // createdBy: this.props.propContent.createdBy,
      createdByUser: '',
      //

      users: [],
      err: '',
      userContent: null,
    }

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    this.getUsers()
    this.getTaskCreatedByUser(this.props.propContent.createdBy)
    moment.locale('en')
    // const { contributors } = this.state
    // this.setState({ userId: userId })
  }

  getUsers() {
    const basename = process.env.REACT_APP_BASENAME || ''
    axios
      .get(`${basename}/api/users`)
      .then((r) => {
        let userContent
        const users = r.data
        userContent = users.map((user, index) => {
          return (
            <option key={index} value={user._id}>
              {user.name + ' ' + user.lastName}
            </option>
          )
        })
        this.setState({
          users: users,
          err: '',
          userContent: userContent,
        })
      })
      .catch((e) => {
        const userContent = <option value="">Loading...</option>
        this.setState({
          users: [],
          err: e,
          userContent: userContent,
        })
      })
  }
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  getTaskCreatedByUser = (userId) => {
    const basename = process.env.REACT_APP_BASENAME || ''
    axios
      .get(`${basename}/api/users/${userId}`)
      .then((response) => {
        // console.log('response.data', response.data)
        if (response.data && response.data.success) {
          this.setState({ createdByUser: response.data.user })
        } else {
          // alert('failed getting user data')
          throw new Error('failed getting user data')
        }
      })
      .catch((error) => {
        // console.log(error)
        alert('failed getting user data')
      })
  }

  handleClick = (id) => {
    const currentUserID = this.props.currentUserID
    if (!currentUserID) {
      alert('you must login first')
      return
    }
    const basename = process.env.REACT_APP_BASENAME || ''

    axios
      .put(`${basename}/api/tasks/update/${id}`, {
        title: this.state.title,
        content: this.state.content,
        status: this.state.status,
        color: this.state.color,
        dueDate: this.state.dueDate,
        contributors: this.state.contributors,
      })
      .then((response) => {
        if (response.data.message) alert(response.data.message)
        else {
          this.toggle()

          //here we inform the tasks page to repload the tasks
          // this.props.onTaskUpdated()
          window.location.reload()
          // this.setState({
          //   title: null,
          //   content: null,
          //   loading: false,
          // })
        }
        // console.log(response)
      })
      .catch((error) => {
        // console.log(error)
        alert('not able to update task')
      })
  }
  toggle() {
    const currentUserID = this.props.currentUserID
    if (!currentUserID) {
      alert('you must login first')
      return
    }
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    let { title, content, status, color, date, dueDate } = this.state
    const { propContent, classType } = this.props

    let userId
    if (this.props.propContent.contributors) {
      userId = this.props.propContent.contributors[0]._id
    } else {
      userId = ''
    }

    const { userContent } = this.state

    const createDateLocalTime = moment(
      date
      // propContent.date
    ).format() //"2023-11-21T17:05:00-08:00"
    const createDateLocalTime2 = createDateLocalTime
      .substring(0, 19)
      .replace('T', ' ')

    const dueDateLocalTime = moment(
      dueDate
      // propContent.dueDate
    ).format() //"2023-11-21T17:05:00-08:00"
    const dueDateLocalTime2 = dueDateLocalTime
      .substring(0, 19)
      .replace('T', ' ')

    // console.log(userId, userContent)

    return (
      <div>
        <Button
          color="primary"
          size="sm"
          className={classType}
          onClick={this.toggle}
        >
          <i className="fas fa-arrow-alt-circle-right" />
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <Label for="title">Task Title:</Label>
            <Input
              type="text"
              name="title"
              defaultValue={title}
              onChange={this.handleInput.bind(this)}
            />
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="content">Task Details:</Label>
              <Input
                type="textarea"
                name="content"
                defaultValue={content}
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status:</Label>
              <Input
                type="select"
                defaultValue={status.toString()}
                name="status"
                id="status"
                onChange={this.handleInput.bind(this)}
              >
                <option value="1">Backlog</option>
                <option value="2">Todo</option>
                <option value="3">In Progress</option>
                <option value="4">Done</option>
              </Input>
            </FormGroup>
            <hr />
            {userContent && (
              <FormGroup>
                <Label for="contributors">Assign to:</Label>
                <Input
                  type="select"
                  name="contributors"
                  id="contributors"
                  defaultValue={userId}
                  onChange={this.handleInput.bind(this)}
                >
                  <option value="">Choose:</option>
                  {userContent}
                </Input>
              </FormGroup>
            )}
            <FormGroup>
              <Label for="color">Task Color:</Label>
              <Input
                type="select"
                name="color"
                id="color"
                defaultValue={color || ''}
                onChange={this.handleInput.bind(this)}
              >
                <option value="">Choose:</option>
                <option value="colorBlue">Blue</option>
                <option value="colorRed">Red</option>
                <option value="colorGreen">Green</option>
                <option value="colorGrey">Grey</option>
              </Input>
            </FormGroup>
            <hr />
            <i className="fas fa-calendar-alt"></i> Created Date:{' '}
            {createDateLocalTime2}
            <br />
            {/* <i className="fas fa-clock"></i> Due Date: {dueDateLocalTime2} */}
            <i className="fas fa-clock"></i> Due Date:{' '}
            <input
              name="dueDate"
              id="dueDate"
              type="datetime-local"
              defaultValue={dueDateLocalTime2}
              onChange={this.handleInput.bind(this)}
            />
            <br />
            {this.state.createdByUser && (
              <div>
                {' '}
                <i className="fas fa-user"></i> Created by:{' '}
                {this.state.createdByUser.name +
                  ' ' +
                  this.state.createdByUser.lastName}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {/* <img
              height="35"
              alt={
                propContent.contributors[0].name +
                ' ' +
                propContent.contributors[0].lastName
              }
              title={
                propContent.contributors[0].name +
                ' ' +
                propContent.contributors[0].lastName
              }
              src={'/assets/img/' + propContent.contributors[0].profilePhoto}
            /> */}
            <Button
              color="primary"
              onClick={() => this.handleClick(propContent._id)}
            >
              Update
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default UpdateTaskModal
