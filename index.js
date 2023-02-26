const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

require('dotenv').config()
const Note = require('./models/note.js')

// Middleware

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan('tiny'))
// app.use(express.urlencoded({extended:false}))

// Gets all notes from the fetch made by React with axios and useEffect  

app.get('/api/notes/', (req, res) => {
     Note.find({})
        .then(notes => {
            res.json(notes)
        })
}) 

// Get a specific note by id
app.get('/api/notes/:id', (request, response, next) => {  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))})


// Add a new note to the database
app.post('/api/notes', (req, res) => {
    const note = new Note({
        content:req.body.content,
        important:req.body.important || false,
    })
    note.save()
        .then(note => {
            res.json(note)
            console.log(`Added new note:\n${note}`)
        })
        .catch(err => {
            console.log(err.message)
            res.status(404).send({error: 'unvalid note schema'})
        })
})


app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
       .then(result => res.status(204).end())
       .catch(err => next(err))
    console.log(`${id} was removed`)
})


app.put('/api/notes/:id', (req,res) => {
    const id = req.params.id
    let note = notes.find(note => note.id == id)
    note.important = !note.important
    res.send(note)
    console.log(`note ${note.id} importance was set to ${note.important}`)
})

// 404 Unknown Endpoint

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint) // Returns error message in JSON format



// Error Handler

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}
app.use(errorHandler)


app.listen(PORT = process.env.PORT, (req,res) => {
    console.log(`Server is running on PORT ${PORT}`)
})