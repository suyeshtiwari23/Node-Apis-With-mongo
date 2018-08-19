const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res, next) => {
    Users.find({email: req.body.email}).then((users) => {
        if(users.length >= 1){
            res.error.Conflict('Email already exist', req.body.email)
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
            if(err){
                res.status(500).json({
                    message: 'Hashing Errror'
                })
            } else {
                const user = new Users({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
                user.save().then((createRes) =>{
                    res.status(200).json({
                        message: 'User Created'
                    })
                }).catch((e) => {
                    console.log(e)
                })
            }
        })
        }
    })
})

router.get('/', (req, res) =>{
    Users.find().then((users) => {
        res.status(200).json({
                users: users
        })
    })
})

router.delete('/:deleteuser', (req, res) =>{
    const userId = req.param.deleteuser
    Users.remove(userId).then((users) => {
        res.status(200).json({
                users: users
        })
    })
})
module.exports = router