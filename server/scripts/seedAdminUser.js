const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const User = require('../models/User.js')
const db = mongoose.connection
require('../helper/db.js')()
  //this db.js returns a mongoose connection on success
  .then((dbConnection) => {
    if (db.readyState) {
      console.log('db is ready')
      //mongoose connection is now stored in dbConnectin
      const password1 = process.env.SCRUM_ADMIN_PASSWORD || 'TheMasterIsGr8' //The master is great
      let newUser = new User({
        username: process.env.SCRUM_ADMIN_USERNAME || 'scrummaster',
        name: 'Scrum',
        lastName: 'Master',
        public: true,
        profilePhoto: 'greatscrum.png',
        // password: derivedKey.toString('hex'),
        password: password1, //no encryption here
        isAdmin: true,
      })

      newUser
        .save()
        .then((user) => {
          db.close()
          return
        })
        .catch((err) => {
          console.log(err)
          db.close()
          return
        })
    } else {
      console.log('db not ready')
      //not ready
      return
    }
  })
  .catch((err) => {
    console.log('not able to connect with mongodb')
    console.log(err)
    db.close()
  })
