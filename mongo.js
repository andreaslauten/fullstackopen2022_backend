/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please use following syntax:')
  console.log('node mongo.js <password>     (to show all persons in database)')
  console.log('node mongo.js <password> <name> <number>     (for saving persons to database)')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.ve1sa3c.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  mongoose
    .connect(url)
    .then((result) => {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))

} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  mongoose
    .connect(url)
    .then((result) => {
      return person.save()
    })
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}