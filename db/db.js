const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kevin_garry:Ndahiriwe123@cluster0.ndrrj.mongodb.net/tienda?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))

exports.mongoose = mongoose;