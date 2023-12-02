var express = require('express')
var router = express.Router()

/* GET homepage of the backend. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'opensource-scrum',
    //details: 'To test, send post request with postman to http://localhost:3000/users page.',
    details: 'Welcome!',
    author: '@opensource-scrum-master',
  })
})

module.exports = router
