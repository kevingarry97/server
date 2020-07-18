const mongoose = require('mongoose')
const Joi = require('joi')

const Mails = mongoose.model('Mails', new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}))

function validateMails(mail) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required()
    })

    return schema.validate(mail)
}

exports.Mails = Mails;