import React, { Component } from 'react'
import Header from './common/header'
class About extends Component {
  render() {
    // //prepare the following:
    // isUserLoggedIn={isUserLoggedIn}
    // isUserAdmin={isUserAdmin}
    // currentUserName={currentUserName}
    // toggleUserLogin={this.toggleUserLogin} //function to toggleUserLogin
    // setUserAdmin={this.setUserAdmin} //function to toggerUserAdmin
    // setCurrentUserName={this.setCurrentUserName} //function to toggerUserAdmin
    // setCurrentUserID={this.setCurrentUserID}

    return (
      <div>
        <Header
        // isUserLoggedIn={isUserLoggedIn}
        // isUserAdmin={isUserAdmin}
        // currentUserName={currentUserName}
        // toggleUserLogin={this.toggleUserLogin} //function to toggleUserLogin
        // setUserAdmin={this.setUserAdmin} //function to toggerUserAdmin
        // setCurrentUserName={this.setCurrentUserName} //function to toggerUserAdmin
        // setCurrentUserID={this.setCurrentUserID}
        />
        <aside className="container">
          <div className="col-sm aboutUs">
            <h2 className="mcell-title story">Abous Us</h2>
            <div className="padding20">Opensource scrum</div>
          </div>
        </aside>
      </div>
    )
  }
}
export default About
