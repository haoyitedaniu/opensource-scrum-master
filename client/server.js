const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const httpApp = express()
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'
httpApp.use(express.static(path.join(__dirname, './build')))
const backendUri = process.env.BACKEND_URI || 'http://localhost:3001'
//proxy to back-end api calls
//(note that it has to be infront of bodyParser and cookieParser for axios post to work)
const proxyOptions = {
  target: backendUri,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  secure: false,
  //here we can do cookieDomainRewrite etc
  //cookieDomainRewrite: {
  //  "unchanged.domain": "unchanged.domain",
  //  "old.domain": "new.domain",
  //  "*": ""
  //}

  //cookiePathRewrite: {
  //  "/unchanged.path/": "/unchanged.path/",
  //  "/old.path/": "/new.path/",
  //  "*": ""
  //}
}

if (env === 'production') {
  //NODE_ENV
  httpApp.set('trust proxy', 1) // trust first
  proxyOptions.secure = true
}

httpApp.use('/api', createProxyMiddleware(proxyOptions))

//send the user to index html page inspite of the url
httpApp.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'))
})

httpApp.use(bodyParser.json())
httpApp.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

if (env === 'development') {
  console.log('running SCRUM Master in development mode')
  httpApp.listen(port) //listen directly to 8080 without the above greenlock-express
} else {
  console.log('running SCRUM Master in production mode')
  //create https SSL certification wrapper to the aloggerpp
  const lex = require('greenlock-express')
    .init({
      packageRoot: './', //__dirname
      configDir: './greenlock.d',
      // contact for security and critical bug notices
      maintainerEmail: 'tom@surveylama.io',
      // whether or not to run at cloudscale
      cluster: false,
    })
    .serve(httpApp)
}
