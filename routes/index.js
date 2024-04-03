const express = require('express')
const userControllers = require('../controllers/user-controllers')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const recordControllers = require('../controllers/record-controllers')
const passport = require('../config/passport')

router.get('/login', userControllers.getLoginPage)
router.get('/register', userControllers.getRegisterPage)
router.post('/register', userControllers.register)
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) throw new Error('請輸入帳號密碼!')
  next()
}, passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), userControllers.login)

router.get('/records', recordControllers.getRecords)

router.use('/', generalErrorHandler)
router.use('/', userControllers.getLoginPage)


module.exports = router