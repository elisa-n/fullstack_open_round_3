const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://elisa:${password}@cluster0.kltl1.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
  let name = process.argv[3]
  let number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })
  
  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(note => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
}

