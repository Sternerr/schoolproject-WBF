const jwt = require("jsonwebtoken");

const asyncHandler = require("./asyncHandler");

// Middleware function to check if the user is authenticated
const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
        req.user = null;
        return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN || "secret" );
    req.user = decoded;

    return next();
})

// Middleware function to check if the authenticated user is an admin
const admin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.user.isAdmin) {
        return next()
    } else {
        return res.redirect("/");
    }
})

module.exports = { isAuthenticated, admin }