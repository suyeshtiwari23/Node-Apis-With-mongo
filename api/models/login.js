const mongoose = require('mongoose')

const LoginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    role:{type: String, required: true, default: 'user'}
})

module.exports = mongoose.model('Login', LoginSchema)