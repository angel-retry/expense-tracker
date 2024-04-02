const userControllers = {
  getLoginPage: (req, res) => {
    return res.render('login')
  }
}

module.exports = userControllers