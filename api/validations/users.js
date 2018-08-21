const user = (body) => {
    let error = {};
    let valid = true;
    if(body.email === ''){
        error.email = "email is required"
        valid = false
    } else if(body.password === ''){
        error.password = "password is required"
        valid= false
    } else if (body.confirmPassword === ''){
        error.confirmPassword = "confirmPassword is required"
        valid = false
    }
    return {valid: valid, error: error}
}

module.exports = user