// @desc Validate email format with regex
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// @desc Validate password through length 
const validatePassword = (password) => {
    return (String(password).length < 8) ? false : true;
}


module.exports = { 
    validateEmail, 
    validatePassword
}
