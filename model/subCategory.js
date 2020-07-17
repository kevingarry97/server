const mongoose = require('mongoose')
const Joi = require('joi')
const { categorySchema } = require('./category')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: categorySchema,
        required: true
    }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

function validateSubCategory(sub) {
    const schema = {
        name: Joi.string().required(),
        categoryId: Joi.string().required()
    }

    return Joi.validate(sub, schema)
}

exports.SubCategory = SubCategory;
exports.subCategorySchema = subCategorySchema;
exports.validate = validateSubCategory;