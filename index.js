const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const mails = require('./routes/mails')
const { mongoose } = require('./db/db')
const category = require('./routes/categories')
const subCategory = require('./routes/subCategories')
const product = require('./routes/products')
const user = require('./routes/users')
const session = require('express-session')
const auth = require('./routes/auth')
const images = require('./routes/images')
const carts = require('./routes/carts')
const discounts = require('./routes/discounts')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const MongoStore = require('connect-mongo')(session)


const app = express()

// Configuration
if(!config.get("jwtPrivatekey")) {
    console.error('FATAL ERROR: jwt key is not defined')
    process.exit(1)
}

// In-Built Middlewares
app.use(cors({credentials: true, origin: 'https://tienda-appl.herokuapp.com'}))
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://tienda-appl.herokuapp.com")
//   res.setHeader("Access-Control-Allow-Credentials", "true")
//   res.setHeader("Access-Control-Max-Age", "1800")
//   res.setHeader("Access-Control-Allow-Headers", "content-type")
//   res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS")
//   next()
// })
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(compression())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
}))

// Sessions
app.use((req, res, next) => {
    res.locals.session = req.session;
    next()
}) 

// Routes
app.use('/api', carts)
app.use('/api/categories', category)
app.use('/api/sub', subCategory)
app.use('/api/product', product);
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api', images)
app.use('/api', discounts)
app.use('/api/mails', mails)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(` Listening on port ${port} `)})