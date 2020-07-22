const express = require('express')
const upload = require('../multer')
const mongoose = require('mongoose')
const { Product } = require('../model/product')
const cloudinary = require('../cloudinary');
const { Image, validate } = require('../model/image')
const router = express.Router()

router.get('/products', (req, res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Image.find();
    if(pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    }
    postQuery.then(document => {
        res.status(200).send(document)
    })
});

router.get('/product/:id', async (req, res) => {
    const product = await Image.findById(req.params.id)
    res.send(product);
})

router.post('/upload-images', upload.array('files'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images')

    const urls = []
    const files = req.files;

    const product = await Product.findById(req.body.productId)
    if(!product) return res.status(400).send(`Can't find product`)

    for(const file of files) {
        const { path } = file

        const newPath = await uploader(path)

        urls.push(newPath)
    }

    let images = new Image({
        image: urls.map(item => item['url']),
        product: product
    })
    images = await images.save()
    res.status(200).send(images)
})

module.exports = router;