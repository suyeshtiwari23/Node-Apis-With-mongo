const express = require('express')
const router = express.Router()
const loginSchema = require('../models/login')
router.post('/', (req, res, next) => {
    const loginReq = req.body
    loginSchema.findOne({username: req.body.username})
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