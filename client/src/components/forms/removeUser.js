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

class RemoveUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      username: '',
      loading: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  getCurrentUserName = () => {
    return this.props.currentUserName
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
    //do not allow remove of current user
    const currentUserName = this.getCurrentUserName()
    if (this.state.username === currentUserName) {
      alert('You cannot remove yourself')
      return
    }
    const basename = process.env.REACT_APP_BASENAME || ''
    axios
      .post(`${basename}/api/users/remove`, {
        username: this.state.username,
      })
      .then((response) => {
        // console.log(response)
        if (response.data && response.data.success) {
          alert('successfully removed user')
          // this.setState({
          //   username: null,
          //   loading: false,
          // })
          this.toggle()
        } else {
          this.toggle()
          this.setState({
            username: null,
            loading: false,
          })
        }
      })
      .catch((error) => {
        // console.log(error)
        alert('failed to remove user')
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
        <i className="fas fa-user-minus" onClick={this.toggle}></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <i className="fas fa-user-circle"></i> Remove User
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}>
              <i className="fas fa-plus-circle"></i> Remove
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

export default RemoveUser
