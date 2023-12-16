const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to....', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB !!!')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB.....:', error.message)
    })

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length >= 3;
            },
            messsage: props => `${props.value} is not a valid name ! it must be of more than 3 characters !`
        },
        required: [true, 'User name required ']
    },

    ph_number: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length >= 8;
            },
            messsage: props => `${props.value} is not a valid number ! it must be of more than 8 characters and 0f formate XXX-XXXXX`
        },
        required: [true, 'User Number required ']
    }
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Note', noteSchema)

// const person = new Note({
//   name: process.argv[3],
//   id: process.argv[4],
//   ph_number: process.argv[5],
// })
// person.save().then(result => {
//     console.log('note saved!')
//     console.log(person)
//     mongoose.connection.close()
//   })
// persons.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })
