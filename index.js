
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const baseUrl = 'http://localhost:3001/api/notes'

let notes = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 5,
    "name": "Mary ",
    "number": "39-12-6423122"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

let p = notes.length
const dt = new Date()
app.get('/info', (request, response) => {
  response.send(`<h1>Total Number of the element in this Phonebook is : ${p}</h1> <h2> ${dt}<h2> `)
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id == id)//in js === does not give true for 1 and '1' as one is int and other is string tht's y used ==
  // console.log(note)
  if (note) {
    response.json(note)
  }
  else {
    response.send(`<h1>The Provided id does not match to any entry</h1>`)
    response.status(404).end()
  }
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  // console.log(note.name)
  const nm = note.name
  const id = note.id
  const flag = notes.find(note => note.name == nm || note.id == id)
  if (flag) {
    response.send(`The duplicate of this already exist in this phonebook :`)
    response.status(204).end()
  }
  else {
    response.json(note)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

