const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
const app = express()
const port = process.env.PORT
app.use(helmet())
//app.use(morgan('combined'))

morgan.token('id', function getId (req) {
    return req.id
  })
      
app.use(morgan(':method :url :response-time'))


app.get('/', (req, res) => {
    res.send("hej!")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

