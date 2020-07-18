const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)


// const schema = Joi.object({ 
//     name: Joi.string() .min(6) .required(),
//     email: Joi.string() .min(6) .required() .email(),
//     password: Joi.string() .min(6) .required() });
    
//     const validation = schema.validate(req.body);
//     res.send(validation);

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(category, schema)
} 

exports.validate = validateCategory;
exports.Category = Category;
exports.categorySchema = categorySchema;