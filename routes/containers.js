const express = require('express')
const router = express.Router()
const containerController = require('../controllers/containerController')

router.get('/', containerController.index)

router.get('/create', containerController.create)

router.get('/:id', containerController.show)

// router.get('start')

router.get('/:id/stop', containerController.stop)

module.exports = router
