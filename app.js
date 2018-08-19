const express = require('express')
const app = express()
const userRouter = require('./api/routes/users')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const responseHandler = require('express-response-handler')
const responseCodes = require('./api/utils/response')
app.use(morgan('dev'))
mongoose.connect(
    'mongodb://suyesh:'+
    process.env.MONGO_ATLAS_PWD+
'@mongodb-shard-00-00-1wi7v.mongodb.net:27017,mongodb-shard-00-01-1wi7v.mongodb.net:27017,mongodb-shard-00-02-1wi7v.mongodb.net:27017/test?ssl=true&replicaSet=mongodb-shard-0&authSource=admin&retryWrites=true',
{useNewUrlParser: true}
);
app.use(responseHandler(responseCodes))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use((req, res, next)=>{ 
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT")
    next()
})

app.use('/users', userRouter)

app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.header('content-type', 'application/json')
    res.error.Unauthorized('permission.error.unauthorized', 'sdf');
})

module.exports = app