const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/create', (req, res, next) => {
  let userData = req.body
  //force new username to be lowercase only
  userData.username = req.body.username.toLowerCase()
  const user = new User(userData)
  return user.save((err, data) => {
    if (err) {
      console.log('error:', err)
      next({ message: 'not able to create user', code: '0', success: false })
    }
    return res.json(data)
  })
})

router.get('/', (req, res, next) => {
  //get all the users in the system
  const promise = User.find({})
  promise
    .then((users) => {
      if (!users) next({ message: 'no', code: '5' })
      //filter out the password info in the response
      const data = users.map((user, index) => {
        return {
          _id: user._id,
          username: user.username,
          name: user.name,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          profilePhoto: user.profilePhoto,
          pubblic: user.public,
          createdDate: user.createdDate,
        }
      })
      //make sure the map is finished and then return the data
      Promise.all(data).then((data) => {
        res.json(data)
      })
      // res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/:id', (req, res, next) => {
  const promise = User.findById(req.params.id)
  promise
    .then((user) => {
      if (!user) next({ message: 'no', code: '5', success: false })

      res.json({
        success: true,
        status: '1',
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          profilePhoto: user.profilePhoto,
          pubblic: user.public,
          createdDate: user.createdDate,
        },
      })
    })
    .catch((err) => {
      console.log('users.js:/:id: error is :', err)
      res.json({
        status: '0',
        err: 'not able to get user info',
        success: false,
      })
    })
})

//User Update

//Delete User by ID
router.delete('/delete/:id', (req, res, next) => {
  const promise = User.findByIdAndRemove(req.params.id)
  //to be safe here, we need to check if currentUser is Admin and
  //also ask currentUser to provide his password
  //and we check if he is Admin and if he has the correct password
  //we should also NOT allow current user to remove himself.

  promise
    .then((count) => {
      if (count == null)
        res.json({
          message: 'not able to remove user',
          status: '0',
          success: false,
        }) //0 if already deleted
      res.json({ status: '1', success: true }) //1 if successfully deleted
    })
    .catch((err) => {
      console.log('users.js:/delete: error is :', err)
      res.json({ status: '0', err: 'not able to delete', success: false })
    })
})

//remove User by username
router.post('/remove', (req, res, next) => {
  //to be safe here, we need to check if currentUser is Admin and
  //also ask currentUser to provide his password
  //and we check if he is Admin and if he has the correct password

  const username = req.body.username
  if (!username)
    next({ status: '0', message: 'not able to remove', success: false })
  const regularExpr = new RegExp('^' + username + '$', 'i')
  const promise = User.findOneAndRemove({ username: regularExpr })
  return promise
    .then((user) => {
      if (user == null)
        return res.json({
          message: 'not able to remove',
          status: '0',
          success: false,
        }) //0 if already delleted
      return res.json({ status: '1', success: true }) //1 if success
    })
    .catch((err) => {
      console.log('users.js:/remove: error is :', err)
      return res.json({
        status: '0',
        message: 'not able to remove',
        success: false,
      })
    })
})

//User Login which returns the user info without the password
router.post('/login', (req, res, next) => {
  //find by user name and then check the password,
  //if the password is correct, then return the user without the password spelled out
  const username = req.body.username
  const password = req.body.password

  console.log("this is user name:",username)
  console.log("this is password:", password)

  if (!username || !password)
    next({ status: '0', err: 'not able to login', success: false })
  const regularExpr = new RegExp('^' + username + '$', 'i')
  const promise = User.findOne({ username: regularExpr }) //find the one with username

  // const filter = { username: username }
  // const promise = User.findOne(filter) //find the one with username

  return promise
    .then((user) => {
      if (!user) {
        next({ status: '0', message: 'not able to login', success: false })
        // throw new Error('did not find the user')
      }

      console.log("this is user:",user)
	    
      if (password !== user.password) {
        next({ status: '0', message: 'not able to login', success: false })
      }
      const userDataWithoutPassword = {
        _id: user._id,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        pubblic: user.public,
        createdDate: user.createdDate,
      }
      return res.json({
        user: userDataWithoutPassword,
        status: '1',
        success: true,
      }) //return the user data without the password
    })
    .catch((err) => {
      console.log('users.js:/login: error is :', err)
      return res.json({
        status: '0',
        message: 'not able to login',
        err: 'not able to login',
        success: false,
      })
    })
})

//User logout which checks the username and then if matches, then logout
router.post('/logout', (req, res, next) => {
  //find by username,
  //if that user exists, then logout
  const username = req.body.username
  if (!username)
    next({
      status: '0',
      message: 'not able to logout',
      err: 'not able to logout',
      success: false,
    })

  const regularExpr = new RegExp('^' + username + '$', 'i')
  const promise = User.findOne({ username: regularExpr }) //find the one with user name
  return promise
    .then((user) => {
      console.log('users.js:/logout:', +user.username + ' logged out')
      return res.json({ success: true }) //return success of logout
    })
    .catch((err) => {
      console.log('users.js:/logout: error is :', err)
      return res.json({
        status: '0',
        message: 'not able to logout',
        err: 'not able to logout',
        success: false,
      })
    })
})

module.exports = router
