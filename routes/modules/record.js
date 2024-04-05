const express = require('express')
const recordControllers = require('../../controllers/record-controllers')
const router = express.Router()

router.get('/new', recordControllers.newRecordPage)
router.get('/:id/edit', recordControllers.editRecordPage)
router.put('/:id', recordControllers.putRecord)
router.get('/', recordControllers.getRecords)
router.post('/', recordControllers.postRecord)

module.exports = router
