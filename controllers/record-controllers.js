const { Category } = require('../models')

const recordControllers = {
  getRecords: (req, res, next) => {
    return res.render('records')
  },
  newRecordPage: (req, res, next) => {
    Category.findAll({ raw: true })
      .then(categories => {
        return res.render('new-record', { categories })
      })
  }
}

module.exports = recordControllers
