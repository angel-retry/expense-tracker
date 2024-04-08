const { Category, Record, sequelize } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')

const recordControllers = {
  getRecords: (req, res, next) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15
    const offset = getOffset(limit, page)

    const userId = req.user.id
    const categoryId = Number(req.query.categoryId)

    const sort = req.query.sort || 'dateUp'
    let sortOrder = []
    switch (sort) {
      case 'moneyUp':
        sortOrder = [['amount', 'DESC']]
        break
      case 'moneyDown':
        sortOrder = [['amount', 'ASC']]
        break
      case 'dateUp':
        sortOrder = [['date', 'DESC']]
        break
      case 'dateDown':
        sortOrder = [['date', 'ASC']]
        break
    }
    Promise.all([
      Record.findAndCountAll({
        raw: true,
        where: {
          userId,
          ...(categoryId ? { categoryId } : {})
        },
        include: [Category],
        order: sortOrder,
        nest: true,
        offset,
        limit
      }),
      Category.findAll({ raw: true }),
      Record.findOne({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
        ],
        where: {
          userId,
          ...(categoryId ? { categoryId } : {})
        },
        raw: true
      })
    ])
      .then(([records, categories, totalAmountResult]) => {
        return res.render('records',
          {
            records: records.rows,
            totalAmount: totalAmountResult.totalAmount,
            categories,
            categoryId,
            sort,
            pagination: getPagination(limit, page, records.count)
          }
        )
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
