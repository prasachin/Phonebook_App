const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const personsRoutes = require('./controllers/persons')
const url=config.MONGODB_URI
logger.info('connecting to ', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(
    logger.info('connected to MongoDB !!!')
  )
  .catch((error) => {
    logger.error('error connecting to MongoDB.....:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/persons', personsRoutes)
app.use(middleware.requestLogger)
app.use(express.static('build'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app