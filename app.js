const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Example app is listening on http://localhost:${port}`)
})