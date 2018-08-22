const express = require('express')
const router = express.Router()
const loginSchema = require('../models/login')
const joiSchema = require('../validations/users')
const Joi = require('joi')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
    const loginReq = req.body
    Joi.validate(req.body, joiSchema.LoginJoi, (err) => {
        if(err){
            res.error.BadRequest('Validation Error')
        }
    })
    loginSchema.findOne({username: req.body.username}).then((user) => {
        const payload = {
            role: user.role
        }
        bcrypt.compare(req.body.password, user.password, (err, logRes) => {
            if(logRes){
                var token = jwt.sign(payload, 'secret',{
                    expiresIn: 10
                })
                res.success.OK('', token)
            } else {
                res.success.OK('Invalid password', logRes)
            }
        })
    })
})

router.get('/getLoginTable', (req, res) =>{
    loginSchema.find({}).then((list) => {
        res.success.OK(list)
    })
})

router.delete('/deleteUser/:deleteuser', (req, res) =>{
    const userId = req.param.deleteuser
    loginSchema.remove(userId).then((users) => {
        res.success.OK('User deleted')
    })
})

module.exports = router