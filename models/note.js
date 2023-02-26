const mongoose = require('mongoose')

// Mongo Connection

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
    .then(res => console.log('Connected to MongoDB!'))
    .catch(err => console.log('Error connecting to MongoDB', err.message))


// Set Schema

const noteSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    important: Boolean,
  })

// Formats the notes response, transforming id into a string and removing the __v

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
const Note = mongoose.model('Note', noteSchema) // Model Definition (constructor)
module.exports = Note