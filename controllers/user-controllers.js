const userControllers = {
  getLoginPage: (req, res) => {
    return res.render('login')
  },
  getRegisterPage: (req, res) => {
    return res.render('register')
  }
}

module.exports = userControllers