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

class AddTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      title: '',
      content: '',
      contributors: '',
      createdBy: '', // '5af1921c0fe5703dd4a463ec', //here should be user Id
      dueDate: '',
      status: this.props.status, //1,2,3,4
      color: '',
      storyId: this.props.storyType,
      loading: false,
      users: [],
      count: 0, //new taskId to use in the database
    }

    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    const currentUserID = this.props.currentUserID
    this.setState({ createdBy: currentUserID })
    moment.locale('en')
    this.getNewTaskID()
    //  Here we should get a new Task Id from back-end instead of using the count
  }
  changeColumnTitle = (number) => {
    let newTitle
    if (number === 1) newTitle = 'Backlog'
    else if (number === 2) newTitle = 'ToDo'
    else if (number === 3) newTitle = 'In Progress'
    else newTitle = 'Done' //number is 4 or other
    return newTitle
  }

  getNewTaskID = async () => {
    const maxTaskID = await this.getMaxTaskID()
    let count = 0
    if (maxTaskID >= 1) {
      count = maxTaskID
    } else {
      count = 0
    }
    this.setState({ count: count + 1 })
  }

  async getMaxTaskID() {
    //count number of existing tasks in the database

    const basename = process.env.REACT_APP_BASENAME || ''

    const promise = axios.get(`${basename}/api/tasks/maxtaskid`)
    const dataPromise = promise.then(async (response) => {
      return response.data.maxTaskID
    })
    return dataPromise
  }
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
    // console.log(this.state.dueDate)
  }
  getUsers() {
    const basename = process.env.REACT_APP_BASENAME || ''
    axios
      .get(`${basename}/api/users`)
      .then((r) => {
        this.setState({
          users: r.data,
          err: '',
        })
      })
      .then((r) => {
        // console.log(this.state.users)
      })
      .catch((e) => {
        this.setState({
          err: e,
        })
      })
  }
  handleClick = async (event) => {
    const currentUserID = this.props.currentUserID
    if (!this.props.currentUserID) {
      alert('you must login first')
      return
    }

    const maxTaskID = await this.getMaxTaskID()
    let count = 0
    if (maxTaskID >= 1) {
      count = maxTaskID
    } else {
      count = 0
    }

    this.setState({ count: count + 1 }, () => {
      // console.log('Here are the contributors', this.state.contributors)
      const basename = process.env.REACT_APP_BASENAME || ''
      axios
        .post(`${basename}/api/tasks`, {
          title: this.state.title,
          content: this.state.content,
          status: Number(this.props.status),
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
          // console.log(response)
        })
        .catch((error) => {
          // console.log(error)
          alert('not able to add task')
        })
    })
  }
  toggle() {
    this.getUsers()
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    const { users } = this.state
    let userContent
    if (!users) userContent = <option value="">Loading...</option>
    else {
      userContent = users.map((user, index) => (
        <option key={index} value={user._id}>
          {user.name + ' ' + user.lastName}
        </option>
      ))
    }
    return (
      <div>
        <i
          className="fas fa-plus-circle customAddTask"
          onClick={() => {
            if (!this.props.currentUserID) {
              alert('you must login first')
              return
            }
            this.toggle()
          }}
        ></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Create a New Task to{' '}
            {this.changeColumnTitle(Number(this.props.status))}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Task Title(*):</Label>
              <Input
                type="text"
                name="title"
                id="taskTitle"
                defaultValue={'TK' + this.state.count.toString()}
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Task Details:</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="contributors">Assign to:</Label>
              <Input
                type="select"
                name="contributors"
                id="contributors"
                onChange={this.handleInput.bind(this)}
              >
                <option value="">Choose:</option>
                {userContent}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="color">Task Color:</Label>
              <Input
                type="select"
                name="color"
                id="color"
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
            {moment().format('L, h:mm:ss')} <br />
            <i className="fas fa-clock"></i> Due Date:{' '}
            <input
              name="dueDate"
              id="dueDate"
              type="datetime-local"
              onChange={this.handleInput.bind(this)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}>
              <i className="fas fa-plus-circle"></i> Add
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              <i className="fas fa-times-circle"></i> Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default AddTask
