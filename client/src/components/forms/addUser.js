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
import axios from 'axios'

class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      username: '',
      password: '',
      isAdmin: 'off',
      name: '',
      lastName: '',
      profilePhoto: 'default.png', //here should be userId
      loading: false,
    }

    this.toggle = this.toggle.bind(this)
  }
  // handleChange = (event) => {
  //   this.setState({ name: event.target.value })
  // }
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
    // console.log(this.state[e.target.name])
  }

  handleClick = (event) => {
    axios
      .post('/scrum/api/users/create', {
        username: this.state.username,
        name: this.state.name,
        lastName: this.state.lastName,
        profilePhoto: this.state.profilePhoto,
        password: this.state.password,
        isAdmin: this.state.isAdmin === 'on', //on or off for true or false
      })
      .then((response) => {
        if (response.data.message) alert(response.data.message)
        else {
          this.toggle()
          this.setState({
            username: null,
            name: null,
            lastName: null,
            password: null,
            isAdmn: null,
            profilePhoto: null,
            loading: false,
          })
        }
        // console.log(response)
      })
      .catch((error) => {
        // console.log(error)
        alert('not able to add user')
      })
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    return (
      <div>
        <i className="fas fa-user-plus" onClick={this.toggle}></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <i className="fas fa-user-circle"></i> Add User
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="username">Username(*):</Label>
              <Input
                type="text"
                name="username"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password(*):</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name(*):</Label>
              <Input
                type="text"
                name="name"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name(*):</Label>
              <Input
                type="text"
                name="lastName"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="profilePhoto">Profile Photo URL(*):</Label>
              <Input
                type="text"
                name="profilePhoto"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="isAdmin">Is Admin User?(*):</Label>
              <Input
                type="checkbox"
                name="isAdmin"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
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

export default AddUser
