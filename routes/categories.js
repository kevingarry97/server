const auth = require('../middleware/auth')
const express = require('express')
const mongoose = require('mongoose')
const { Category, validate } = require('../model/category')
const validateObjectId = require('../middleware/validateObjectId')

const router = express.Router()

router.get('/', async (req, res) => {
    const category = await Category.find()
    res.send(category)
})

router.get('/:id', validateObjectId, async (req, res) => {
    const category = await Category.findById(req.params.id)

    if(!category) return res.status(404).send('The Category with the ID is invalid')

    res.send(category)
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let category = await Category.findOne({ name: req.body.name })
    if(category) return res.status(400).send('Duplicate Category')

    category = new Category({ name: req.body.name });
    category = await category.save()

    res.status(200).send(category)
})

module.exports = router;