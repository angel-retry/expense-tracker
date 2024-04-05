const { Category, Record } = require('../models')

const recordControllers = {
  getRecords: (req, res, next) => {
    return res.render('records')
  },
  newRecordPage: (req, res, next) => {
    Category.findAll({ raw: true })
      .then(categories => {
        return res.render('new-record', { categories })
      })
  },
  postRecord: (req, res, next) => {
    const { name, categoryId, amount, date } = req.body
    const userId = req.user.id
    if (!name || !categoryId || !amount || !date) throw new Error('請填入資料!')
    return Record.create({ name, categoryId, amount, date, userId })
      .then(() => {
        req.flash('success_messages', '成功新增支出!')
        return res.redirect('/records')
      })
      .catch(err => next(err))
  }
}

module.exports = recordControllers