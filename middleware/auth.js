const { ensureAuthenticated } = require('../helpers/auth-helpers')

const authenticate = (req, res, next) => {
  if (ensureAuthenticated(req)) return next()
  req.flash('error_messages', '請先登入')
  return res.redirect('back')
}

module.exports = {
  authenticate
}