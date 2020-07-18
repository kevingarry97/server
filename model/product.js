const mongoose = require('mongoose')
const { categorySchema } = require('./category')
const { subCategorySchema } = require('./subCategory')
const Joi = require('joi')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 5
    },
    category: {
        type: categorySchema,
        required: true,
    },
    subCategory: {
        type: subCategorySchema,
        required: true,
    },
    sizes: {
        type: [ String],
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    colors: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true,
        minlength: 6
    },
    owner: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    details: {
        type: [ String],
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    amount: {
        type: Number,
        required: true
    }
})

function validateProduct(product) {
    const schema = Joi.object().keys({
        productName: Joi.string().min(5).required(),
        categoryId: Joi.string().required(),
        subCategoryId: Joi.string().required(),
        sizes: Joi.required(),
        availability: Joi.string().required(),
        colors: Joi.string().required(),
        caption: Joi.string().min(6).required(),
        owner: Joi.string().required(),
        item: Joi.string().required(),
        tag: Joi.string().required(),
        details: Joi.required(),
        description: Joi.string().min(20).required(),
        amount: Joi.number().required()
    })
    return schema.validate(product)
}

const Product = mongoose.model('Product', productSchema)

exports.Product = Product;
exports.validate = validateProduct;
exports.productSchema = productSchema