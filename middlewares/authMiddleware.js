const jwt = require("jsonwebtoken");

const asyncHandler = require("./asyncHandler");

// Middleware function to check if the user is authenticated
const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
        return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN || "secret" );
    req.user = decoded;

    return next();
})

// Middleware function to check if the authenticated user is an admin
const admin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error("Not Authorized");
    }
})

module.exports = { isAuthenticated, admin }