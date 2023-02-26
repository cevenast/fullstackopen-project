const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// Mongo Connection
const password = process.argv[2]

console.log(`The password is: ${password}`)
const url = `mongodb+srv://cevenast:${password}@cluster0.jfb29ms.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// Set Schema

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) // Model Definition (constructor)

// // Creates new Note document

// const note = new Note({
//   content: 'digital pen type thermometer',
//   important: true,
// })

// // Saves the document in the notes collection

// note.save()
//     .then(result => {
//         console.log('note saved!')
//         mongoose.connection.close() //If it's not closed, the program will never finish its execution
//     })

Note.find({important:false}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })