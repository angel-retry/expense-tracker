const express = require('express')
const userControllers = require('../controllers/user-controllers')
const router = express.Router()

router.get('/login', userControllers.getLoginPage)
router.get('/register', userControllers.getRegisterPage)

router.use('', userControllers.getLoginPage)

module.exports = router