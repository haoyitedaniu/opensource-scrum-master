const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const env = process.env.NODE_ENV || 'development' //take the NODE_ENV value or "development"
console.log('env is here',env)
const config = require('./mongo.json')[env] //read the mongo.json file in current directory and take the env entry

module.exports = () => {
  mongoose.set('useCreateIndex', true)
  const envUrl = process.env[config.use_env_variable]
  //Define a local URL variable if we're not in production
  console.log("port",config.port)
  const localUrl = `mongodb://${config.host}/${config.database}`
  //set the connection URL
  const mongoUrl = envUrl ? envUrl : localUrl
  console.log('mongoUrl used:', mongoUrl)

  return mongoose.connect(mongoUrl)
}
