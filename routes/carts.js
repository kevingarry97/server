const express = require('express')
const { Image } = require('../model/image')
const Cart = require('../model/cart')
const { Order, validate } = require('../model/order')

const router = express.Router()

router.get('/shopping-cart', (req, res) => {
    if(!req.session.cart) return res.send(req.session.cart);

    let cart = new Cart(req.session.cart)
    res.send({products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty})
})

router.get('/orders', async (req, res) => {
    const order = await Order.find()
    res.send(order)
})

router.get('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.send(order);
})

router.get('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {})

    const product = await Image.findById(productId)
    if(!product) return res.status(404).send(`Can't find product`)

    cart.add(product, product.id)
    req.session.cart = cart;
    res.send(req.session.cart)
})

router.get('/remove/:id', (req, res) => {
    const productId = req.params.id
    const cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.removeItem(productId);
    req.session.cart = cart;
    res.send(req.session.cart)
})

router.post('/checkout', async (req, res) => {
    if(!req.session.cart) return res.send(req.session.cart);

    const cart = new Cart(req.session.cart)

    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let order = new Order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        adress1: req.body.adress1,
        adress2: req.body.adress2,
        country: req.body.country,
        city: req.body.city,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        cart,
        textId: req.body.textId,
        orderNote: req.body.orderNote
    })

    order = await order.save()
    req.session.cart = null;

    res.json({
        message: 'Successfully bought',
        order
    })
})


module.exports = router;