const mongoose = require('mongoose')
require("dotenv").config();
const url = process.env.DB_URL
//const url = "mongodb+srv://admin:Sebbe123@cluster0.pxu8r.mongodb.net/persons?retryWrites=true&w=majority"


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(result => {
    console.log("db funkar")
})
.catch(error => {
    console.log("fel", error.mongoose)
})

const personSchema = new mongoose.Schema({
    name: String,
    password: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)