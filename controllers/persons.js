const personsRoutes = require('express').Router()
const { response, request } = require('express')
const Note = require('../models/person')

personsRoutes.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

personsRoutes.get('/:id', (request, response, next) => {
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

personsRoutes.post('/', (request, response, next) => {
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

personsRoutes.delete('/', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(
            response.status(204).end()
        )
        .catch(error => next(error))
})
const dt = new Date()
personsRoutes.get('/all/info', (request, response) => {
    Note.find({}).then(notes => {
        const p = notes.length
        response.send(`<h1>Total Number of the element in this Phonebook is : ${p}</h1> <h2> ${dt}<h2> `)
    })
})

module.exports = personsRoutes