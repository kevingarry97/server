const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const schema = Joi.object().keys({
        name: Joi.string().required()
    })

    return schema.validate(category)
} 

exports.validate = validateCategory;
exports.Category = Category;
exports.categorySchema = categorySchema;