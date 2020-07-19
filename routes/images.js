const express = require('express')
const upload = require('../multer')
const mongoose = require('mongoose')
const { Product } = require('../model/product')
const { Image } = require('../model/image')
const router = express.Router()

router.get('/products', async (req, res) => {
    const product = await Image.find()
    res.status(200).send(product)
});

router.get('/product/:id', async (req, res) => {
    const product = await Image.findById(req.params.id)
    res.send(product);
})

router.post('/upload-images', upload.array('files'), async (req, res) => {

    const urls = []
    const files = req.files;
    const url = req.protocol + '://' + req.get('host')

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(400).send(`Can't find product`)

    for(const file of files) {
        const { path } = file

        urls.push(url + '/image/' +path)
    }

    let images = new Image({
        image: urls,
        product: product
    })
    
    images = await images.save()
    res.status(200).send(images)
})

module.exports = router;