const dayjs = require('dayjs')

module.exports = {
  today: dayjs().format('YYYY-MM-DD'),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}
