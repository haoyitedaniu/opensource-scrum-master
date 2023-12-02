import React from 'react'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
class UserLogout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      loading: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  setCurrentUserName = (name) => {
    this.props.setCurrentUserName(name)
  }

  setCurrentUserID = (id) => {
    this.props.setCurrentUserID(id)
  }

  getCurrentUserName = () => {
    return this.props.currentUserName
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

  handleClick = (event) => {
    const username = this.getCurrentUserName()
    axios
      .post('/scrum/api/users/logout', {
        username: username,
      })
      .then((response) => {
        if (response.data && response.data.success) {
          alert('You have successfully logged out')
          //here set the state of isUserLoggedIn to false
          //here check if the user is admin, if yes, set the set of isUserAdmin to false
          //flip the user to be non-admin for not yet logged in
          this.props.setUserAdmin(false)
          this.props.toggleUserLogin(false) //flip the user's login status to false
          this.setCurrentUserName('') //
          this.setCurrentUserID('') //
          // this.toggle()
        } else {
          //not able to logout, close the modal and do nothing
          this.toggle()
          this.setState({
            //reset the state
            loading: false,
          })
        }
      })
      .catch((error) => {
        alert('Oops not able to logout')
      })
  }
  toggle() {
    //toggle the on-off of the modal
    this.setState({
      modal: !this.state.modal,
    })
  }
  render() {
    const currentUserName = this.getCurrentUserName()
    return (
      <div>
        {/* <i class="fa-regular fa-user-xmark"></i> */}
        <i className="fas fa-user-slash" onClick={this.toggle}></i>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <i className="fas fa-user-circle"></i> {'Logout ' + currentUserName}
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}>
              <i className="fas fa-plus-circle"></i> Logout
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
export default UserLogout
