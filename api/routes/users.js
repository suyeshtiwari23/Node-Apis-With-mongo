const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const LoginSchema = require('../models/login')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const joiSchema = require('../validations/users')
const Joi = require('joi')

router.post('/signup', (req, res, next) => {
    Users.find({email: req.body.email}).then((users) => {
				const validations = Joi.validate(req.body, joiSchema.UserJoi, (err, value) =>{
					if(err){
						res.error.BadRequest('Validation Error')
					}
				})
        if(users.length >= 1){
            res.error.Conflict('Email already exist', req.body.email)
        } else {
					if(req.body.password === req.body.confirmPassword){
							bcrypt.hash(req.body.password, 10, (err, hash) =>{
									if(err){
											res.status(500).json({
													message: 'Hashing Errror'
											})
									} else {
											const user = new Users({
													_id: new mongoose.Types.ObjectId(),
													email: req.body.email,
													phone: req.body.phone
											});
											const loginDetails = new LoginSchema({
												_id: new mongoose.Types.ObjectId(),
												username: req.body.email,
												password: hash
											});
											user.save().then((createRes) =>{
													loginDetails.save().then((loginTabRes) => {
														res.success.Created('User created successfully', loginTabRes)
													})
											}).catch((e) => {
													res.error.BadRequest(e)
											})
									}
							})
					} else {
						res.error.Conflict('Password and Confirm password is not same')
					}
        }
    })
})

router.get('/', (req, res) =>{
    Users.find().then((users) => {
        res.success.OK('User list', users)
    }).catch((err) =>{
			console.log(err)
		})
})

router.delete('/:deleteuser', (req, res) =>{
    const userId = req.param.deleteuser
		console.log(userId)
		Users.findOne({_id: userId}).then((user) =>{
			if(!user) {
				Users.deleteOne(userId).then((users) => {
					res.success.OK('User Deleted Sucessfully', {status: 'success'})
				})
			}
		}).catch((e) => {
			console.log(e)
		})
    
})
module.exports = router