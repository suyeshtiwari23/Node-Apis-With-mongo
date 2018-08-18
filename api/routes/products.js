const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
    Products.find().exec().then((products) => {
        res.status(200).json(products)
    }).catch((e) => {
        console.log(e)
    })
    
})

router.post('/', (req, res, next) => {
    const product = new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save();
    res.status(200).json({
        message: product
    })
})

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId
    Products.findById(productId).then((product) =>{
        res.status(200).json({
            message: 'this is get products',
            product: product
        })
    }).catch((e) =>{
        console.log(e)
    })
})

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId
    const updateProps = {}

    Products.update({_id:productId},{$set: {name: req.body.name, price: req.body.price}}).then((product) =>{
        res.status(200).json({
            message: 'product got updated',
            product: product
        })
    }).catch((e) =>{
        console.log(e)
    })
})

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId
    Products.deleteOne({_id:productId}).then((product) =>{
        res.status(200).json({
            message: 'product got deleted'
        })
    }).catch((e) =>{
        console.log(e)
    })
})


module.exports = router