const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const containers = require('./routes/containers')
const PORT = 3035

app.use(bodyParser.urlencoded({
  extended: true
}))
// Routes
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.use('/containers', containers)

// Listen
app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`)
})
