const express = require('express')
const recordControllers = require('../../controllers/record-controllers')
const router = express.Router()

router.get('/', recordControllers.getRecords)

module.exports = router