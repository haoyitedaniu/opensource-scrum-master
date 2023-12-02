const mongoose = require('mongoose')
const Schema = mongoose.Schema
const StorySchema = new Schema({
  // _id will be automatically created
  title: {
    type: String,
    maxlength: 128,
  },
  content: {
    type: String,
    default: 'No Content',
  },
  createdBy: {
    //id of a user
    type: Schema.Types.ObjectId,
  },
  storyId: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('story', StorySchema)
