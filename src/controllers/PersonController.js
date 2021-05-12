const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personRouter.get("/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

personRouter.post("/", (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    password: body.password,
  });

  person.save().then((person) => {
    response.json(person);
  });
});

personRouter.delete("/", (request, response) => {
  const body = request.body
  const personId = body.id

  Person.findByIdAndDelete(personId, err => {
    if(err) {
      console.log(err)
      response.status(404).end();
    }
    response.status(200).end()
  });
})

personRouter.put('/', (request, response) => {
  const body = request.body

  const personId = body.id

  const person = {
    name: body.name,
    password: body.password
  }

  Person.findByIdAndUpdate(personId, person, { new: true })
  .then(updatePerson => {
    response.json(updatePerson)
  })
  .catch(error => console.log(error))
})

module.exports = personRouter