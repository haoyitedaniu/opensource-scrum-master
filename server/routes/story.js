const express = require('express')
const router = express.Router()
const Story = require('../models/Story')

//counts how many stories in the back-end
router.get('/count', (req, res) => {
  const promise = Story.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])
  promise
    .then((count) => {
      res.json({ count: count })
    })
    .catch((err) => {
      console.log('error getting count of stories')
      res.json(err)
    })
})

//max storyId from the stories in the back-end
router.get('/maxstoryid', (req, res, next) => {
  Story.find({})
    .sort({ storyId: -1 })
    .limit(1)
    .then((stories) => {
      if (stories.length == 0) {
        return res.json({
          maxStoryID: 0,
          code: '1',
          success: true,
        })
      }
      return res.json({
        maxStoryID: stories[0].storyId,
        code: '1',
        success: true,
      })
    })
    .catch((err) => {
      console.log('error getting max storyID  of stories', err)
      next({ message: 'max storyId not found', code: '0', success: false })
    })
})

//Create Story
router.post('/create', (req, res) => {
  const storyDummyData = {
    title: 'Dummy title',
    storyId: '',
    createdBy: '', // '5af1921c0fe5703dd4a463ec', //here should be user Id
    // status:'0',
  }
  const story = new Story(storyDummyData)
  story.save((err, data) => {
    if (err) {
      console.log('error is :', err)
      next({ message: 'Story not found', code: '0', status: '1' })
    }
    //return the saved story (this story is temporary), so that we should delete it
    //if we don't update it with correct content
    res.json({ data: data, status: '0' }) //successful
  })
})

//Create and Update Story
router.post('/', (req, res, next) => {
  console.log('body:', req.body)
  const story = new Story(req.body)
  return story.save((err, data) => {
    if (err) {
      console.log('error is :', err)
      next({ message: 'Story not found', code: '0', success: false })
    }
    return res.json(data)
  })
})

//Read all stories
router.get('/', (req, res, next) => {
  const promise = Story.find({})
  promise
    .then((data) => {
      if (!data) next({ message: 'no data', code: 5 })
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//Read Story by Id
router.get('/:id', (req, res, next) => {
  const promise = Story.findById(req.params.id)
  promise
    .then((data) => {
      if (!data) next({ message: 'no data', code: 5 })
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//Update Story Id
router.post('/update/:id', (req, res, next) => {
  console.log('body:', req.body)

  dataToUpdate = req.body //
  // const story = new Story(req.body)
  // here we retrieve the Story with the given id, and then update it
  const promise = Story.findByIdAndUpdate(req.params.id, dataToUpdate)
  promise
    .then((count) => {
      if (count == null) res.json({ status: '0' }) //0 if updated
      res.json({ status: '1' }) //1 if not updated
    })
    .catch((err) => {
      res.json(err)
    })
})

//Delete by story Id
router.delete('/delete/:id', (req, res) => {
  const promise = Story.findByIdAndRemove(req.params.id)
  promise
    .then((count) => {
      if (count == null) res.json({ status: '0' }) //0 if already deleted (success)
      res.json({ status: '1' }) //1 if not deleted (failure)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
