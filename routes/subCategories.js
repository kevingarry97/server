const express = require('express')
const mongoose = require('mongoose')
const { SubCategory, validate } = require('../model/subCategory')
const { Category } = require('../model/category')

const router = express.Router()

router.get('/', async (req, res) => {
    const subs = await SubCategory.find().sort('name')
    res.status(200).send(subs);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId)
    if(!category) return res.status(400).send('Invalid Category')

    sub = new SubCategory({
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        }
    })

    sub = await sub.save()

    res.send(sub)
})

module.exports = router;