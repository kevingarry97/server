const mongoose = require('mongoose')
const Joi = require('joi')
const { imageSchema } = require('./image')

const discountSchema = new mongoose.Schema({
    item: {
        type: imageSchema,
        required: true
    },
    percentage: {
        type: Number,
        required:true
    },
    newAmount:{
        type: Number,
        required: true
    }
})

function validateDiscount(discount) {
    const schema = Joi.object().keys({
        id: Joi.required(),
        percentage: Joi.number().required()
    })

    return schema.validate(discount)
}

const Discount = mongoose.model('Discount', discountSchema)

exports.validate = validateDiscount;
exports.Discount = Discount;