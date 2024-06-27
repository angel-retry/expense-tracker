const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const { engine } = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3000
const router = require('./routes')
const passport = require('./config/passport')
const { getUser } = require('./helpers/auth-helpers')
const handlebarsHelpers = require('./helpers/handlebars-helpers.js')
const methodOverride = require('method-override')
require('dotenv').config()

app.engine('hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(router)

app.listen(3000, () => {
  console.log(`Example app is listening on http://localhost:${port}`)
})
