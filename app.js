const express = require('express')
const morgan = require('morgan')
const app = express()

// API ROUTES
const javaRoutes = require('./api/routes/java.js')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// CORS HEADERS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// USE ROUTES
app.use('/java', javaRoutes)

// ERROR HANDLING
app.use((req, res, next) => {
  const error = new Error('Page not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
