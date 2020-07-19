const express = require('express')
const { Image } = require('../model/image')
const { Discount, validate } = require('../model/discount')

const router = express.Router()

router.get('/discount', async (req, res) => {
    let discount = await Discount.find()
    res.send(discount);
})

router.post('/discount', async (req, res) => {

    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const item = await Image.findByIdAndRemove(req.body.id);
    if(!item) return res.status(400).send('No product Found')

    let discountData = new Discount({
        item,
        percentage: req.body.percentage,
        newAmount: product.product.amount - (product.product.amount * req.body.percentage) / 100
    })

    discountData = await discountData.save()
    res.send(discountData);
});


module.exports = router;
