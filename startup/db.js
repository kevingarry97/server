const mongoose = require('mongoose')
const winston = require('winston')
const config = require('config')

module.exports = function() {
    const db = config.get('db');
    mongoose
    .connect('mongodb+srv://kevin_garry:Ndahiriwe123@cluster0.ndrrj.mongodb.net/tienda?retryWrites=true&w=majority', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true, 
        useFindAndModify: false 
    })
    .then(() => winston.info('Connected to mongoDB...'))
}