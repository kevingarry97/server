const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const error = require('../middleware/error')
const mails = require('../routes/mails')
const category = require('../routes/categories')
const subCategory = require('../routes/subCategories')
const product = require('../routes/products')
const user = require('../routes/users')
const auth = require('../routes/auth')
const images = require('../routes/images')
const carts = require('../routes/carts')
const discounts = require('../routes/discounts')
const { mongoose } = require('./db')

module.exports = function(app) {
    app.use(cors({origin: [
        'https://tienda-appl.herokuapp.com', 'http://localhost:4200'
    ], credentials: true}));

    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())
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

    app.use('/api', carts)
    app.use('/api/categories', category)
    app.use('/api/sub', subCategory)
    app.use('/api/product', product);
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api', images)
    app.use('/api', discounts)
    app.use('/api/mails', mails)

    app.use(error)
}