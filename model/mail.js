const mongoose = require('mongoose')
const Joi = require('joi')

const Mails = mongoose.model('Mails', new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}))

exports.Mails = Mails;