const express = require('express')
const router = express.Router()
const containerController = require('../controllers/containerController')

router.get('/', containerController.index)

router.get('/create', containerController.create)

router.get('/:id', containerController.show)

router.get('/:id/start', containerController.start)

router.get('/:id/stop', containerController.stop)

router.get('/:id/delete', containerController.delete)

module.exports = router
