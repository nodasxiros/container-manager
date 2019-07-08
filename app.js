const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const containers = require('./routes/containers')

app.use(bodyParser.urlencoded({
  extended: true
}))
// Routes
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.use('/containers', containers)

// Listen
app.listen(3000)
