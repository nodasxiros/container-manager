const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Routes
app.get('/', (req, res) => {
  res.send('Home Page')
})

// Listen
app.listen(3000)
