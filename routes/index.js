const express = require('express')
const userControllers = require('../controllers/user-controllers')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/login', userControllers.getLoginPage)
router.get('/register', userControllers.getRegisterPage)

router.use('/', userControllers.getLoginPage)
router.use('/', generalErrorHandler)

module.exports = router