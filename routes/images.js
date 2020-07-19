const express = require('express')
const upload = require('../multer')
const mongoose = require('mongoose')
const { Product } = require('../model/product')
const cloudinary = require('../cloudinary');
const { Image, validate } = require('../model/image')
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
    let files = req.files
    const url = req.protocol + '://' + req.get('host')

    for(const file of files) {
        const { path } = file

        urls.push(url + '/image/' +path)
    }

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(404).send('Not Found');

    let image = new Image({
        image: urls,
        product
    })

    image = await image.save()
    res.send(image);
})

module.exports = router;