const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tiendra', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))

exports.mongoose = mongoose;