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

class EditTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: true,
      title: '',
      content: '',
      contributors: '',
      createdBy: '', // '5af1921c0fe5703dd4a463ec', //here should be user Id
      dueDate: '',
      date: '',
      status: this.props.status,
      color: '',
      storyId: this.props.storyType,
      loading: false,
      users: [],
      count: 0, //new taskId to use in the database

      userId: '', //task owner's userId
      userContent: null,
    }

    this.toggle = this.toggle.bind(this)
  }

  componentWillMount() {
    const currentUserID = this.props.currentUserID
    this.setState({ createdBy: currentUserID })
    //initialize the state with props of the existing task except the taskID
    this.setState({
      title: this.props.title,
      content: this.props.content,
      // status: this.props.status,
      contributors: this.props.contributors,
      dueDate: this.props.dueDate,
      date: this.props.date,
      color: this.props.color,
      storyId: this.props.storyId,
      createdBy: this.props.createdBy,
      count: this.props.taskId,
    })
  }
  componentDidMount() {
    this.getUsers()
    moment.locale('en')
    const { contributors } = this.state
    let userId //userId of the current task assigned to
    if (contributors) {
      userId = contributors[0]._id
    } else {
      userId = ''
    }
    this.setState({ userId: userId })
  }

  componentWillUnmount() {
    this.props.unsetEditStatus()
  }
  changeColumnTitle = (number) => {
    let newTitle
    if (number === 1) newTitle = 'Backlog'
    else if (number === 2) newTitle = 'ToDo'
    else if (number === 3) newTitle = 'In Progress'
    else newTitle = 'Done' //4 or others
    return newTitle
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  getUsers() {
    axios
      .get('/scrum/api/users')
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
  handleClick = async (event) => {
    const currentUserID = this.props.currentUserID
    if (!this.props.currentUserID) {
      alert('you must login first')
      return
    }
    //call back end to to update the task with given id in this.state.count
    axios
      .post('/scrum/api/tasks/update', {
        title: this.state.title,
        content: this.state.content,
        status: this.props.status,
        contributors: this.state.contributors,
        dueDate: this.state.dueDate,
        color: this.state.color,
        storyId: this.state.storyId,
        createdBy: currentUserID, //this.state.createdBy,
        taskId: this.state.count, //the new taskId to use in the database
      })
      .then((response) => {
        if (response.data.message) alert(response.data.message)
        else {
          this.toggle()

          this.setState({
            title: null,
            content: null,
            contributors: null,
            taskId: null,
            dueDate: null,
            loading: false,
          })
        }
      })
      .catch((error) => {
        alert('not able to edit task')
      })
  }
  toggle() {
    this.getUsers()
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    const dueDateLocalTime = moment(this.state.dueDate).format() //"2023-11-21T17:05:00-08:00"
    const dueDateLocalTime2 = dueDateLocalTime
      .substring(0, 19)
      .replace('T', ' ') //"2023-11-21T17:05:00"
    const { userId } = this.state
    const { userContent } = this.state
    const { status } = this.props
    const newTitle = this.changeColumnTitle(status)
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Update Task to {newTitle}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Task Title(*):</Label>
              <Input
                type="text"
                name="title"
                id="taskTitle"
                defaultValue={this.state.title}
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Task Details:</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                defaultValue={this.state.content}
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
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
                defaultValue={this.state.color || ''}
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
            <i className="fas fa-calendar-alt"></i> Created/Updated Date:{' '}
            {moment(this.state.date).format('L, h:mm:ss')}
            <br />
            <i className="fas fa-clock"></i> Due Date:{' '}
            <input
              name="dueDate"
              id="dueDate"
              type="datetime-local"
              defaultValue={dueDateLocalTime2}
              onChange={this.handleInput.bind(this)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}>
              <i className="fas fa-edit"></i> Update
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.toggle()
              }}
            >
              <i className="fas fa-times-circle"></i> Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default EditTask
