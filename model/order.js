const mongoose = require('mongoose')
const Joi = require('joi')

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        required: true
    },
    adress1: {
        type: String,
        required: true
    },
    adress2: {
        type: String
    },
    country: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    city: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    zipCode: {
        type: Number
    },
    phone: {
        type: Number,
        required: true
    },
    orderNote: {
        type: String
    },
    cart: { 
        type: Object, required: true 
    },
    textId: {
        type: Number,
        required: true
    }
})

function validate(order) {
    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(25).required(),
        lastName: Joi.string().min(3).max(25).required(),
        email: Joi.string().required().email(),
        adress1: Joi.string().required(),
        country: Joi.string().min(4).max(30).required(),
        city: Joi.string().min(4).max(30).required(),
        phone: Joi.number().required(),
        textId: Joi.number().required()
    })

    return schema.validate(order)
}

const Order = mongoose.model('Order', orderSchema)

exports.validate = validate;
exports.Order = Order;