const mongoose = require('mongoose')
const express = require('express')
const { SubCategory } = require('../model/subCategory')
const { Product, validate } = require('../model/product')
const { Category } = require('../model/category')

const router = express.Router()

router.get('/', async (req, res) => {
    const product = await Product.find()
    res.send(product)
})

router.post('/', async (req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)
    if (!category) return res.status(400).send(`Can't find the category`)

    const subCategory = await SubCategory.findById(req.body.subCategoryId)
    if (!subCategory) return res.status(400).send(`Can't find the sub-category`) 

    let product = new Product({
        productName: req.body.productName,
        category,
        subCategory,
        owner: req.body.owner,
        sizes: req.body.sizes,
        availability: req.body.availability,
        colors:req.body.colors,
        caption: req.body.caption,
        item: req.body.item,
        tag: req.body.tag,
        details: req.body.details,
        description: req.body.description,
        amount: req.body.amount
    })

    product = await product.save()
    res.status(200).send(product)
})

module.exports = router;