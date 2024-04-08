const { Category, Record } = require('../models')

const recordControllers = {
  getRecords: (req, res, next) => {
    const userId = req.user.id
    const categoryId = Number(req.query.categoryId)
    let sort = req.query.sort || 'dateUp'
    switch (sort) {
      case 'moneyUp':
        sort = [['amount', 'DESC']]
        break
      case 'moneyDown':
        sort = [['amount', 'ASC']]
        break
      case 'dateUp':
        sort = [['date', 'DESC']]
        break
      case 'dateDown':
        sort = [['date', 'ASC']]
        break
    }
    console.log(sort)
    Promise.all([
      Record.findAll({
        raw: true,
        where: {
          userId,
          ...(categoryId ? { categoryId } : {})
        },
        include: [Category],
        order: sort,
        nest: true
      }),
      Category.findAll({ raw: true })
    ])
      .then(([records, categories]) => {
        const totalAmount = records.reduce((total, record) => total + record.amount, 0)
        return res.render('records', { records, totalAmount, categories, categoryId })
      })
      .catch(err => next(err))
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
  },
  editRecordPage: (req, res, next) => {
    const { id } = req.params
    Promise.all([
      Record.findByPk(id,
        {
          raw: true
        }),
      Category.findAll({ raw: true })
    ])
      .then(([record, categories]) => {
        if (!record) throw new Error('此支出不存在!')
        console.log('record', record)
        return res.render('edit-record', { record, categories })
      })
      .catch(err => next(err))
  },
  putRecord: (req, res, next) => {
    const { id } = req.params
    const userId = req.user.id
    const { name, categoryId, amount, date } = req.body
    if (!name || !categoryId || !amount || !date) throw new Error('請填入資料!')
    return Record.findByPk(id)
      .then(record => {
        if (!record) throw new Error('沒有此支出!')
        if (record.toJSON().userId !== userId) throw new Error('你沒有權限修改此資料!')
        return record.update({ name, categoryId, amount, date })
      })
      .then(() => {
        req.flash('success_messages', '成功修改支出!')
        return res.redirect('/records')
      })
      .catch(err => next(err))
  },
  deleteRecord: (req, res, next) => {
    const { id } = req.params
    const userId = req.user.id
    return Record.findByPk(id)
      .then(record => {
        if (!record) throw new Error('沒有此支出!')
        if (record.toJSON().userId !== userId) throw new Error('你沒有權限刪除此資料!')
        return record.destroy()
      })
      .then(() => {
        req.flash('success_messages', '成功刪除支出!')
        return res.redirect('/records')
      })
      .catch(err => next(err))
  }
}

module.exports = recordControllers
