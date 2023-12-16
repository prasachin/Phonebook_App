const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://psachin:${password}@cluster0.ybqmmcc.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  id: Number,
  ph_number: Number,
})

const persons = mongoose.model('persons', noteSchema)

const person = new persons({
  name: process.argv[3],
  id: process.argv[4],
  ph_number: process.argv[5],
})
person.save().then(result => {
    console.log('note saved!')
    console.log(person)
    mongoose.connection.close()
  })
persons.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })