const express = require('express')
const recordControllers = require('../../controllers/record-controllers')
const router = express.Router()

router.get('/new', recordControllers.newRecordPage)
router.get('/', recordControllers.getRecords)
router.post('/', recordControllers.postRecord)

module.exports = router