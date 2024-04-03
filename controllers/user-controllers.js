const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userControllers = {
  getLoginPage: (req, res) => {
    return res.render('login')
  },
  getRegisterPage: (req, res) => {
    return res.render('register')
  },
  register: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    if (!name || !email || !password || !passwordCheck) throw new Error('請把欄位都寫進來!')
    if (password !== passwordCheck) throw new Error('密碼輸入不同，請再確認密碼!')
    Promise.all([
      User.findOne({ where: { email } }),
      bcrypt.hash(password, 10)
    ])
      .then(([user, hash]) => {
        if (user) throw new Error('此信箱已註冊過，請再註冊一個!')
        return User.create({ name, email, password: hash })
      })
      .then(() => {
        req.flash('success_messages', '註冊成功!')
        res.redirect('/login')
      })
      .catch(err => next(err))
  },
  login: (req, res) => {
    req.flash('success_messages', '成功登入!')
    res.redirect('/records')
  },
  logout: (req, res) => {
    req.flash('success_messages', '成功登出!')
    res.redirect('/login')
  }
}

module.exports = userControllers
