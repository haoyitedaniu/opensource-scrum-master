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
class UserLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      username: '',
      password: '',
      loading: false,
    }

    this.toggle = this.toggle.bind(this)
  }
  // handleChange = (event) => {
  //   this.setState({ name: event.target.value })
  // }

  setCurrentUserName = (name) => {
    this.props.setCurrentUserName(name)
  }
  setCurrentUserID = (id) => {
    this.props.setCurrentUserID(id)
  }

  toggleUserLogin = (yesno) => {
    //flip the user login status
    this.props.toggleUserLogin(yesno)
  }
  setUserAdmin = (isAdmin) => {
    //true or false
    //set the user as Admin if true
    this.props.setUserAdmin(isAdmin)
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
    // console.log(this.state.dueDate)
  }

  handleClick = (event) => {
    const basename = process.env.REACT_APP_BASENAME || '' // '/'
	  //
    const pathToCallBackEnd=`${basename}/api/users/login`

    console.log("path to call",pathToCallBackEnd) //This is going to /scrum/api/users/login 
    axios
      .post(`${basename}/api/users/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        if (response.data && response.data.success) {
          // alert(response.data)
          //here set the state of isUserLoggedIn to true
          //here check if the user is admin, if yes, set the set of isUserAdmin to true
          this.toggleUserLogin(true)
          this.setCurrentUserName(response.data.user.username) // get the user name in the returned data
          this.setCurrentUserID(response.data.user._id) // get the user name in the returned data
          if (response.data.user.isAdmin) {
            this.setUserAdmin(true)
          } else {
            this.setUserAdmin(false)
          }
          // this.toggle()
        } else {
          // this.toggleUserLogin(false)
          // alert('failed loggin in')
          this.toggle()
          this.setState({
            //reset the state
            username: null,
            password: null,
            loading: false,
          })
          throw new Error('failed loggin in')
        }
      })
      .catch((error) => {
        // console.log(error)
        alert('failed loggin in')
        this.toggleUserLogin(false)
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
        <i className="fas fa-user" onClick={this.toggle}></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <i className="fas fa-user-circle"></i> Login
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
              <Label for="name">Password(*):</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}>
              <i className="fas fa-plus-circle"></i> Login
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              <i className="fas fa-times-circle"></i> Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default UserLogin
