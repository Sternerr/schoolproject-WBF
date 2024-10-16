const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../db/models/userModel");
const UserService = require("../db/services/userService");
const { validateEmail, validatePassword} = require("../utils/validation");

const salt = 10;
const JWT_SECRET = "secret";

// @desc Auth User & Create Session
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(validateEmail(email) && validatePassword(password)) {
        const user  = await UserService.authUser(email.toLowerCase());

        if(user && (await bcrypt.compare(password, user.password))) {        
            const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '30d' });

            res.cookie("jwt", token, { 
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.redirect("/");
        } 
    }

    res.status(401);
    res.render("login", { 
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
            await UserService.createUser({
                name: name,
                email: email,
                password: await bcrypt.hash(password, salt),
                isAdmin: 0
            });
    
            let user  = await UserService.authUser(email.toLowerCase());
            
            const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '30d' });

            res.cookie("jwt", token, { 
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.redirect("/");
        } 
    } else {
        res.render("register", { 
            form: {
                name: (String(name).length <= 1) ? true : false,
                email: !validateEmail(email),
                password: !validatePassword(password),
            }
        });
    }


});

// @desc Logout User
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

// @desc Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("User Profile");
});

// @desc Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("User Profile");
});

// @desc Get Users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("Get Users");
});

// @desc Delete User
// @access private/admin
const deleteUsers = asyncHandler(async (req, res) => {
    res.send("Delete User");
});

// @desc Update User
// @access private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("Delete User");
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    updateUser,
}