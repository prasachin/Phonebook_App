const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(express.static('dist'))
const Note = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') { 
    return response.status(400).json({ error: error.message })
   }

  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

Note.find({}).then(notes => {
  const persons = notes
})
const dt = new Date()
app.get('/info', (request, response) => {
  Note.find({}).then(notes => {
    const p = notes.length
    response.send(`<h1>Total Number of the element in this Phonebook is : ${p}</h1> <h2> ${dt}<h2> `)
  })
})

app.get('/api/persons', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined || body.ph_number === undefined) {
    return response.status(400).json(
      {
        error: 'content missing Buddy!'
      })
  }
  const note = new Note({
    name: body.name,
    id: body.id,
    ph_number: body.ph_number,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
