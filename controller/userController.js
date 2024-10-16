const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../middlewares/asyncHandler");
const { validateEmail, validatePassword} = require("../utils/validation");

const UserService = require("../db/services/userService");

// @desc Auth User & Create Session
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(validateEmail(email) && validatePassword(password)) {
        const user  = await UserService.authUser(email.toLowerCase());

        if(user && (await bcrypt.compare(password, user.password))) {        
            const token = jwt.sign({ user }, process.env.JWT_SECRET || "secret", { expiresIn: '30d' });

            res.cookie("jwt", token, { 
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.redirect("/");
        } 
    }

    return res.render("loginPage", { 
        form: {
            email: !validateEmail(email),
            password: !validatePassword(password),
        }
    });
});

// @desc Register User
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(name && validateEmail(email) && validatePassword(password)) {
        let user = await UserService.authUser(email.toLowerCase());

        if(!user) {
            await UserService.create({
                name: name,
                email: email,
                password: await bcrypt.hash(password, Number(process.env.SALT) || 10),
                isAdmin: 0
            });
    
            let user  = await UserService.authUser(email.toLowerCase());
            
            const token = jwt.sign({ user }, process.env.JWT_SECRET || "secret", { expiresIn: '30d' });

            res.cookie("jwt", token, { 
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.redirect("/");
        } 
    } else {
        return res.render("registerPage", { 
            form: {
                name: (String(name).length <= 1) ? true : false,
                email: !validateEmail(email),
                password: !validatePassword(password),
            }
        });
    }
});

// @desc Logout User && Clear Cookie
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});


module.exports = {
    authUser,
    registerUser,
    logoutUser,
}