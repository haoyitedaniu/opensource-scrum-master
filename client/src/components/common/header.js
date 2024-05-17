import React, { Component } from 'react'
import { Link } from 'react-router'
import AddUser from '../forms/addUser'
import UserLogin from '../forms/userLogin'
import UserLogout from '../forms/userLogout'
import RemoveUser from '../forms/removeUser'

class Header extends Component {
  //here we should say Login or AddUser
  //for AdminUser, add AddUser capability
  //for nonAdminUser, only show UserProfile
  constructor(props, context) {
    super(props, context)
  }
  // ====props passed in from Dashboard====
  // isUserAdmin={this.state.isUserAdmin}
  // isUserLoggedIn={this.state.isUserLoggedIn}
  // currentUserName={this.state.currentUserName}
  // toggleUserLogin={this.toggleUserLogin} //function to toggleUserLogin
  // setUserAdmin={this.setUserAdmin} //function to toggerUserAdmin
  // setCurrentUserName={this.setCurrentUserName}
  // setCurrentUserID={this.setCurrentUserID}

  toggleUserLogin = (yesno) => {
    //flip between false<-->true
    this.props.toggleUserLogin(yesno)
  }
  setUserAdmin = (isAdmin) => {
    //flip between false<-->true
    this.props.setUserAdmin(isAdmin)
  }
  setCurrentUserName = (name) => {
    this.props.setCurrentUserName(name)
  }

  setCurrentUserID = (id) => {
    this.props.setCurrentUserID(id)
  }

  showUserProfile = (isUserLoggedIn, isUserAdmin, currentUserName) => {
    // console.log('user loggin status', isUserLoggedIn)
    // console.log('user admin status', isUserAdmin)
    // console.log('user name status', currentUserName)
    if (isUserLoggedIn === true) {
      return (
        <div
          style={{ alignContent: 'center', minWidth: '100px', width: 'auto' }}
        >
          <UserLogout
            toggleUserLogin={this.toggleUserLogin}
            setUserAdmin={this.setUserAdmin}
            setCurrentUserName={this.setCurrentUserName}
            setCurrentUserID={this.setCurrentUserID}
            currentUserName={currentUserName}
          />
          {isUserAdmin === true && <AddUser />}
          {isUserAdmin === true && (
            <RemoveUser currentUserName={currentUserName} />
          )}
        </div>
      )
    } else {
      return (
        <div
          style={{ alignContent: 'center', minWidth: '100px', width: 'auto' }}
        >
          <UserLogin
            toggleUserLogin={this.toggleUserLogin}
            setUserAdmin={this.setUserAdmin}
            setCurrentUserName={this.setCurrentUserName}
            setCurrentUserID={this.setCurrentUserID}
          />
        </div>
      )
    }
  }
  render() {
    const isUserLoggedIn = this.props.isUserLoggedIn
    const isUserAdmin = this.props.isUserAdmin
    const currentUserName = this.props.currentUserName
    const basename = process.env.REACT_APP_BASENAME || ''
    // REACT_APP_BASENAME=/master   //deploy under /master
    // REACT_APP_BASENAME=          //deploy under / (by default)

    return (
      <header>
        <div className="container containerDashboard">
          <div className="mainMenu">
            <ul>
              <Link to={`${basename}/`} activeClassName="active">
                <li>
                  <i className="fas fa-folder-open"></i>
                  <span className="mainMenuText">Projects</span>
                </li>
              </Link>
              <Link to={`${basename}/about`} activeClassName="active">
                <li>
                  <i className="fas fa-thumbs-up" />
                  <span className="mainMenuText">About</span>
                </li>
              </Link>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={`opensource-scrum-master.com/${basename}`}
              >
                {/* <li><i className="fas fa-code-branch"/>
                      <span className="mainMenuText">Fork Me on Github</span>
                      </li> */}
              </a>
            </ul>
          </div>
          <div className="profilewidget">
            {this.showUserProfile(isUserLoggedIn, isUserAdmin, currentUserName)}
          </div>
        </div>
      </header>
    )
  }
}
export default Header
