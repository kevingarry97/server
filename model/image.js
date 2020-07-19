const mongoose = require('mongoose')
const Joi = require('joi')
const { productSchema } = require('./product')

const imageSchema = new mongoose.Schema({
    image: {
        type: [ String ],
        required: true
    },
    product: {
        type: productSchema,
        required: true
    }
})

function validateImages(image) {
    const schema = {
        image: Joi.required(),
        productId: Joi.required()
    }
    return Joi.validate(image, schema)
}

const Image = mongoose.model('Image', imageSchema);

exports.Image = Image;
exports.validate = validateImages;
exports.imageSchema = imageSchema