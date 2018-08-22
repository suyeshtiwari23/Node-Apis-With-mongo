const Joi = require('joi')


// const user = (body) => {
//     let error = {};
//     let valid = true;
//     if(body.email === ''){
//         error.email = "email is required"
//         valid = false
//     } else if(body.password === ''){
//         error.password = "password is required"
//         valid= false
//     } else if (body.confirmPassword === ''){
//         error.confirmPassword = "confirmPassword is required"
//         valid = false
//     }
//     return {valid: valid, error: error}
// }

const UserJoi = Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().required()
})

const LoginJoi = Joi.object().keys({
    username: Joi.string().required(),
	password: Joi.string().required(),
})

module.exports = {UserJoi: UserJoi, LoginJoi: LoginJoi}