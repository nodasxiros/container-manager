const express = require('express')
const router = express.Router()
const containerController = require('../controllers/containerController')

router.get('/', containerController.index)

module.exports = router
