const express = require('express')
const app = express()
const cors = require('cors')
PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
// app.use(express.urlencoded({extended:false}))

let notes = [
    {    
        id: 1,
        content: "HTML is easy",     
        important: true  
    },  
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false  
    },  
    {    
        id: 3,    
        content: "GET and POST are the most important methods of HTTP protocol",    
        important: true  
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Super Title</h1>')
})

app.get('/api/notes/', (req, res) => {
     res.json(notes)
}) 

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id == id)
    if (note){
        res.json(note)
    }
    else{
        res.sendStatus(404).end() // for responding to the request without sending any data.
    }
})

app.post('/api/notes', (req, res) => {
    const note = {
        content:req.body.content,
        important:req.body.important || false,
        id: notes[notes.length-1].id + 1
    }

    notes.push(note)
    res.json(note)
})


app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id != id)
    res.status(204).end()
    console.log(`${id} was removed`)
})

app.put('/api/notes/:id', (req,res) => {
    const id = req.params.id
    let note = notes.find(note => note.id == id)
    note.important = !note.important
    res.send(note)
    console.log(`note ${note.id} importance was set to ${note.important}`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint) // Returns error message in JSON format

app.listen(PORT, (req,res) => {
    console.log(`Server is running on PORT ${PORT}`)
})