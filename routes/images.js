const express = require('express')
const upload = require('../multer')
const mongoose = require('mongoose')
const { Product } = require('../model/product')
const cloudinary = require('../cloudinary');
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

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
    const urls = []
    const files = req.files;
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
    }
    
    res.status(200).json({
        message: 'images uploaded successfully',
        data: urls
    })
})

module.exports = router;