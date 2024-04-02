const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const router = require('./routes')

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(router)

app.listen(3000, () => {
  console.log(`Example app is listening on http://localhost:${port}`)
})