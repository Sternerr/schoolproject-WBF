// Validation checker for email format
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Validation checker for password format
const validatePassword = (password) => {
    return (String(password).length < 8) ? false : true;
}


module.exports = { 
    validateEmail, 
    validatePassword
}
