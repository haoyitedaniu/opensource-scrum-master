const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  //_id will be obtained automatically
  username: {
    type: String,
    unique: [true, 'Please use a different username'],
  },
  name: String,
  lastName: String,
  public: {
    type: Boolean,
    default: true,
  },
  profilePhoto: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
})

// profilePhoto	"asdfad"
// _id	"6542e0d59683403994b79d0a"
// username	"tomm"
// name	"longg"
// lastName	"asdasfd"
// password	"123"
// public	true
// isAdmin	false
// createdDate	"2023-11-01T23:35:49.200Z"
// __v	0

module.exports = mongoose.model('user', UserSchema)
