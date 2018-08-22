const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, trim: true},
    phone: {type: Number, trim: true}
})

module.exports = mongoose.model('Users', UserSchema)