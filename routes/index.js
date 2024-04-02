const express = require('express')
const userControllers = require('../controllers/user-controllers')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const recordControllers = require('../controllers/record-controllers')

router.get('/login', userControllers.getLoginPage)
router.get('/register', userControllers.getRegisterPage)
router.post('/register', userControllers.register)

router.get('/records', recordControllers.getRecords)

router.use('/', generalErrorHandler)
router.use('/', userControllers.getLoginPage)


module.exports = router