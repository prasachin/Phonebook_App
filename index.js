
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)
// const baseUrl = 'http://localhost:3001/api/persons'

  let persons =[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Sachin",
      "number": "6205042648",
      "id": 4
    },
    {
      "name": "ranji",
      "number": "65821",
      "id": 5
    },
    {
      "name": "sdfhyj",
      "number": "65892",
      "id": 6
    },
    {
      "name": "sachin",
      "number": "5644",
      "id": 7
    },
    {
      "name": "sjghhj",
      "number": "658",
      "id": 8
    },
    {
      "name": "",
      "number": "",
      "id": 9
    },
    {
      "name": "ramji ",
      "number": "65848",
      "id": 10
    },
    {
      "name": "uykglkj",
      "number": "03989",
      "id": 11
    },
    {
      "name": "fgxj",
      "number": "56+",
      "id": 12
    },
    {
      "name": "sachin praksh ",
      "number": "2698456265",
      "id": 13
    },
    {
      "name": "rani singh",
      "number": "6524856525",
      "id": 14
    }
  ]

let p = persons.length
const dt = new Date()
app.get('/info', (request, response) => {
  response.send(`<h1>Total Number of the element in this Phonebook is : ${p}</h1> <h2> ${dt}<h2> `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id == id)//in js === does not give true for 1 and '1' as one is int and other is string tht's y used ==
  // console.log(note)
  if (note) {
    response.json(note)
  }
  else {
    response.send(`<h1>The Provided id does not match to any entry</h1>`)
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const note = request.body
  console.log(note)
  // console.log(note.name)
  const nm = note.name
  const id = note.id
  const flag = persons.find(note => note.name == nm || note.id == id)
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

