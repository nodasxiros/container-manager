const express = require('express')
const app = express()
const mongoose = require('mongoose')
const containers = require('./routes/containers')
const containerController = require('./controllers/containerController')

// Routes
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.use('/containers', containers)

// Listen
app.listen(3000)
