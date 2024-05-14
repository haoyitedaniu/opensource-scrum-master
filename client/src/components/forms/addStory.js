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

class AddStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      title: '',
      content: '',
      createdBy: '', //5af1921c0fe5703dd4a463ec here should be user Id
      count: 0,
      err: '',
    }
    this.toggle = this.toggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount = () => {
    const currentUserID = this.props.currentUserID
    this.setState({ createdBy: currentUserID })
    this.getNewStoryID()
    //  Here we should get a new Story Id from back-end instead of using the count
  }

  // componentWillMount = () => {
  //   const currentUserID = this.props.currentUserID
  //   this.setState({ createdBy: currentUserID })
  // }

  getNewStoryID = async () => {
    const maxStoryID = await this.getMaxStoryID()
    let count = 0
    if (maxStoryID >= 1) {
      count = maxStoryID
    } else {
      count = 0
    }
    this.setState({ count: count + 1 })
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  async getStoryCount() {
    const basename = process.env.REACT_APP_BASENAME || ''
    //count number of existing stories in the database
    console.log('====basename=====:', basename)
    const promise = axios.get(`${basename}/api/story/count`)
    const dataPromise = promise.then(async (response) => {
      var data = response.data.count
      const promises = data.map(getPromise)
      return Promise.all(promises).then(function (arrayOfData) {
        // arrayOfData contains all the data, you can then maybe transform
        //it correctly instead of manipulating global state.
        return arrayOfData
      })
    })
    return dataPromise
    function getPromise(object) {
      let count = object.count
      if (count) return count
    }
  }

  async getMaxStoryID() {
    //count number of existing stories in the database
    const basename = process.env.REACT_APP_BASENAME || ''
    console.log('====basename=====:', basename)
    const promise = axios.get(`${basename}/api/story/maxstoryid`)
    const dataPromise = promise.then(async (response) => {
      return response.data.maxStoryID
    })
    return dataPromise
  }

  handleClick = async (event) => {
    const currentUserID = this.props.currentUserID
    if (!this.props.currentUserID) {
      alert('you must login first')
      return
    }
    const maxStoryID = await this.getMaxStoryID()
    let count = 0
    if (maxStoryID >= 1) {
      count = maxStoryID
    } else {
      count = 0
    }

    //set the storyID(which is the count of the next story)
    //instead of using the count, we should use the max value of the storyID
    //in the database instead

    this.setState({ count: count + 1 }, () => {
      const basename = process.env.REACT_APP_BASENAME || ''
      axios
        .post(`${basename}/api/story`, {
          title: this.state.title,
          content: this.state.content,
          createdBy: currentUserID, // this.props.createdBy,
          storyId: this.state.count,
        })
        .then((response) => {
          if (response.data.error) alert(response.data.error)
          else {
            this.props.updateStoryList()
            this.getNewStoryID()
            this.toggle()
            this.setState({
              title: null,
              createdBy: null,
              storyId: null,
              loading: false,
            })
          }
        })
        .catch((error) => {
          // console.log(error)
          alert('not able to add story')
        })
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
        <Button
          color="secondary"
          onClick={() => {
            if (!this.props.currentUserID) {
              alert('you must login first')
              return
            }
            this.toggle()
          }}
        >
          <i className="fas fa-plus-circle" /> Add User Story
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add User Story</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Story Title(*):</Label>
              <Input
                type="text"
                name="title"
                defaultValue={'US' + this.state.count.toString()}
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Story Details:</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="createdBy">Created by(*):</Label>
              <Input
                type="text"
                name="createdBy"
                onChange={this.handleInput.bind(this)}
              />
            </FormGroup> */}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={this.state.title === null || this.state.title === ''}
              onClick={this.handleClick.bind(this)}
            >
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

export default AddStory
