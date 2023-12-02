const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

//create new task
router.post('/', (req, res, next) => {
  const task = new Task(req.body)
  const promise = task.save()
  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//Shows how many tasks are in which status
//group the tasks by status
router.get('/counter', (req, res) => {
  const promise = Task.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])
  promise
    .then((count) => {
      res.json(count)
    })
    .catch((err) => {
      res.json(err)
    })
})

//max storyId from the stories in the back-end
router.get('/maxtaskid', (req, res, next) => {
  Task.find({})
    .sort({ taskId: -1 })
    .limit(1)
    .then((tasks) => {
      if (tasks.length == 0) {
        return res.json({
          maxTaskID: 0,
          code: '1',
          success: true,
        })
      }
      return res.json({
        maxTaskID: tasks[0].taskId,
        code: '1',
        success: true,
      })
    })
    .catch((err) => {
      console.log('error getting max taskID  of tasks', err)
      next({ message: 'max taskID not found', code: '0', success: false })
    })
})

//get task by storyId and its contributors
router.get('/:id', (req, res) => {
  const promise = Task.aggregate([
    {
      $match: {
        storyId: parseInt(req.params.id),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'contributors',
        foreignField: '_id',
        as: 'contributors',
      },
    },
    {
      $unwind: {
        path: '$contributors',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          content: '$content',
          title: '$title',
          status: '$status',
          date: '$date',
          color: '$color',
          dueDate: '$dueDate',
          createdBy: '$createdBy',
          taskId: '$taskId',
        },
        contributors: {
          $push: '$contributors',
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        content: '$_id.content',
        title: '$_id.title',
        status: '$_id.status',
        date: '$_id.date',
        dueDate: '$_id.dueDate',
        color: '$_id.color',
        createdBy: '$_id.createdBy',
        contributors: '$contributors',
        taskId: '$taskId',
      },
    },
  ])
  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//get a single task using its id
router.get('/task/:id', (req, res) => {
  const promise = Task.aggregate([
    {
      $match: {
        _id: parseInt(req.params.id),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'contributors',
        foreignField: '_id',
        as: 'contributors',
      },
    },
    {
      $unwind: {
        path: '$contributors',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          content: '$content',
          title: '$title',
          status: '$status',
          date: '$date',
          color: '$color',
          dueDate: '$dueDate',
          createdBy: '$createdBy',
          taskId: '$taskId',
        },
        contributors: {
          $push: '$contributors',
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        content: '$_id.content',
        title: '$_id.title',
        status: '$_id.status',
        date: '$_id.date',
        dueDate: '$_id.dueDate',
        color: '$_id.color',
        createdBy: '$_id.createdBy',
        contributors: '$contributors',
        taskId: '$taskId',
      },
    },
  ])
  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//Update a task by id
router.put('/update/:id', (req, res) => {
  console.log('here is req.body', req.body)
  const promise = Task.findByIdAndUpdate(req.params.id, req.body)
  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//Delete a task by id
router.delete('/delete/:id', (req, res) => {
  const promise = Task.findByIdAndRemove(req.params.id)
  promise
    .then((count) => {
      if (count == null) res.json({ status: '0' }) // 0 if already deleted
      res.json({ status: '1' }) //1 if able to delete
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
