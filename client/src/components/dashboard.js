import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import Story from './story'
import AddStory from './forms/addStory'
import Loader from './loader'
import Header from './common/header'

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
      show: true,
      tasks: [],
      stories: [],
      err: '',
      err2: '',
      loading: true,
      loadingStory: true,
      isUserLoggedIn: false,
      isUserAdmin: false,
      currentUserName: '',
      currentUserID: '', //5af1921c0fe5703dd4a463ec
    }
    this.getStoryTaskData = this.getStoryTaskData.bind(this)
  }

  componentWillMount() {
    this.toggleUserLogin(this.getIsUserLoggedInLocalStorage())
    this.setUserAdmin(this.getIsUserAdminLocalStorage())
    this.setCurrentUserName(this.getCurrentUserNameLocalStorage())
    this.setCurrentUserID(this.getCurrentUserIDLocalStorage())
  }
  componentDidMount = () => {
    this.getStoryDetails()
    this.getStoryTaskData() //get the tasks data of the story
    //update the tasks data every 2 seconds of the chosen story
    setInterval(() => {
      this.getStoryTaskData()
    }, 2000)

    //update the current state from the local storage
    this.toggleUserLogin(this.getIsUserLoggedInLocalStorage())
    this.setUserAdmin(this.getIsUserAdminLocalStorage())
    this.setCurrentUserName(this.getCurrentUserNameLocalStorage())
    this.setCurrentUserID(this.getCurrentUserIDLocalStorage())
  }

  //use local storage instead
  toggleUserLoginLocalStorage = (yesno) => {
    //Yes for logging in, no for logging out
    //flip between false<-->true
    localStorage.setItem('isUserLoggedIn', yesno)
    if (yesno === false) {
      this.setUserAdminLocalStorage(false) // if loggin out, set isUserAdmin to false
    }
  }

  setUserAdminLocalStorage = (isAdmin) => {
    if (isAdmin === true) {
      localStorage.setItem('isUserAdmin', true)
    } else {
      localStorage.setItem('isUserAdmin', false)
    }
  }

  setCurrentUserNameLocalStorage = (name) => {
    if (name) {
      localStorage.setItem('currentUserName', name)
    } else {
      localStorage.setItem('currentUserName', '')
    }
  }
  setCurrentUserIDLocalStorage = (id) => {
    if (id) {
      localStorage.setItem('currentUserID', id)
    } else {
      localStorage.setItem('currentUserID', '')
    }
  }

  //use local storage instead
  getIsUserAdminLocalStorage = () => {
    return localStorage.getItem('isUserAdmin') || false
  }

  getIsUserLoggedInLocalStorage = () => {
    return localStorage.getItem('isUserLoggedIn') || false
  }
  getCurrentUserNameLocalStorage = () => {
    return localStorage.getItem('currentUserName') || ''
  }

  getCurrentUserIDLocalStorage = () => {
    return localStorage.getItem('currentUserID') || ''
  }

  toggleUserLogin = (yesno) => {
    this.setState({ isUserLoggedIn: yesno })
    this.toggleUserLoginLocalStorage(yesno)
    if (yesno === false) {
      this.setUserAdmin(false)
      this.setCurrentUserName('')
      this.setCurrentUserID('')
    }
  }

  setUserAdmin = (isAdmin) => {
    if (isAdmin === true) {
      this.setState({ isUserAdmin: true })
      this.setUserAdminLocalStorage(true)
    } else {
      this.setState({ isUserAdmin: false })
      this.setUserAdminLocalStorage(false)
    }
  }
  setCurrentUserName = (name) => {
    this.setState({ currentUserName: name ? name : '' })
    this.setCurrentUserNameLocalStorage(name ? name : '')
  }
  setCurrentUserID = (id) => {
    this.setState({ currentUserID: id ? id : '' })
    this.setCurrentUserIDLocalStorage(id ? id : '')
  }

  getStoryDetails = () => {
    axios
      .get(`/scrum/api/story`)
      .then((r) => {
        //here we should also sort the stories by title

        function compare(a, b) {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        }

        const stories = r.data.sort(compare)
        this.setState({
          stories: stories, //r.data,
          err2: '',
        })
      })
      .then(() => {
        this.setState({
          loadingStory: false,
        })
      })
      .catch((e) => {
        this.setState({
          loadingStory: false,
          err2: e,
        })
      })
  }

  getStoryTaskData = () => {
    //get all the tasks under storyId id
    if (!this.props.params.id) {
      //make sure we know the User story Id (storyId)
      return
    }
    axios
      .get(`/scrum/api/tasks/${this.props.params.id}`)
      .then((r) => {
        //here we sort the tasks in r.data by title
        //or due date
        function compare(a, b) {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        }

        const tasks = r.data.sort(compare)

        this.setState({
          tasks: tasks, //r.data,
          err: '',
        })
      })
      .then(() => {
        this.setState({
          loading: false,
        })
      })
      .catch((e) => {
        if (!e.response) {
          this.setState({
            loading: true,
            err: e,
          })
        } else
          this.setState({
            loading: false,
            err: e,
          })
      })
  }

  deleteApi = (id) => {
    if (!this.state.currentUserID && !this.state.isUserAdmin) {
      alert('you must login as admin user first')
      return
    }

    let yesno = prompt('Please enter yes to continue to delete this user story')
    if (yesno && yesno.toLowerCase() === 'yes') {
      axios
        .delete('/scrum/api/story/delete/' + id)
        .then(
          function (response) {
            if (response.status === '1') alert('ok')
            //update the current list of stories
            this.getStoryDetails()
            this.getStoryTaskData()
          }.bind(this)
        )
        .catch(function (error) {
          // console.log(error)
          alert('error deleting user story')
        })
    }
  }

  render() {
    let { stories, loadingStory } = this.state

    // //prepare the following
    // isUserLoggedIn={isUserLoggedIn}
    // isUserAdmin={isUserAdmin}
    // currentUserName={currentUserName}
    // toggleUserLogin={this.toggleUserLogin} //function to toggleUserLogin
    // setUserAdmin={this.setUserAdmin} //function to toggerUserAdmin
    // setCurrentUserName={this.setCurrentUserName} //function to toggerUserAdmin
    // setCurrentUserID={this.setCurrentUserID}

    const isUserAdmin = this.state.isUserAdmin //this.getIsUserAdmin()
    const isUserLoggedIn = this.state.isUserLoggedIn //this.getIsUserLoggedIn()
    const currentUserName = this.state.currentUserName //this.getCurrentUserName()
    const currentUserID = this.state.currentUserID //this.getCurrentUserID()

    let storyTable
    if (!loadingStory) {
      storyTable = stories.map((story, index) => {
        //only show 10 characters
        const titleLength = story.title.length //get length
        const subtitle = story.title.substring(0, Math.min(titleLength, 10))
        const title = subtitle + (titleLength > 10 ? '...' : '').toString()
        const storyId = story._id
        return (
          <li key={index}>
            <div>
              <Link
                style={{ display: 'inline' }}
                to={`/scrum/story/${story.storyId}`}
                activeClassName="active"
              >
                <i className="fas fa-list-alt"></i>
                <span className="menu-text">{title}</span>
              </Link>
              <span
                style={{ textAlign: 'right' }}
                id="delete"
                className="fas fa-times"
                onClick={() => this.deleteApi(storyId)}
              ></span>
            </div>
          </li>
        )
      })
    } else {
      storyTable = (
        <li>
          <div className="loader">
            <Loader />
          </div>
        </li>
      )
    }

    return (
      <div>
        <div className="side">
          <span className="logo">Scrum</span>
          <div className="otherMenu">
            <AddStory
              currentUserID={this.state.currentUserID}
              updateStoryList={
                //program that allows update of StoryList after adding a new story
                () => {
                  this.getStoryDetails()
                  this.getStoryTaskData()
                }
              }
            />
          </div>
          <ul className="side-menu">{storyTable}</ul>
        </div>
        <div className="con">
          <Header
            isUserLoggedIn={isUserLoggedIn}
            isUserAdmin={isUserAdmin}
            currentUserName={currentUserName}
            toggleUserLogin={this.toggleUserLogin} //function to toggleUserLogin
            setUserAdmin={this.setUserAdmin} //function to toggerUserAdmin
            setCurrentUserName={this.setCurrentUserName} //function to toggerUserAdmin
            setCurrentUserID={this.setCurrentUserID}
          />
          <aside>
            {this.props.router.params.id ? (
              <Story
                story={this.state.stories.filter(
                  (i) => i.storyId === parseInt(this.props.router.params.id)
                )}
                storyType={this.props.params.id}
                tasks={this.state.tasks}
                loading={this.state.loading}
                currentUserID={currentUserID}
              />
            ) : (
              <div className="container">
                <div className="space">
                  <h2 className="story">
                    Welcome to Scrum Master, Please choose or add stories.
                  </h2>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    )
  }
}
export default Dashboard
