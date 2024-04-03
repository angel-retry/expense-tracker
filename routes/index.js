const express = require('express')
const userControllers = require('../controllers/user-controllers')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')
const record = require('./modules/record')
const { authenticate } = require('../middleware/auth')

router.use('/records', authenticate, record)

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



router.get('/logout', userControllers.logout)

router.use('/', (req, res) => {
  return res.redirect('/records')
})
router.use('/', generalErrorHandler)


module.exports = router