require('dotenv').config();

const path = require("path");
const express = require("express");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const { create } = require("express-handlebars");


const { isAuthenticated, admin } = require("./middlewares/authMiddleware");

// Configure Handlebars view engine
const app = express();
const hbs = create( {
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
    helpers: {
        isTabActve: (tab, activeTab) => ( tab === activeTab ? "active" : "" ) //Checks active endpoint
    }
});

// Imports route handlers
const homeRoute = require("./routes/homeRoute");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const adminRoute = require("./routes/adminRoute");

// Sets up the view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs")
app.set("views", "./views")

// Serves static files from the public directory
app.use("/assets", express.static(path.join(__dirname, "./public")));

// Middleware for parsing URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// Use cookieParser middleware to handle cookies
app.use(cookieParser());

// Configure session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Applying authentication middleware to all routes
app.use(isAuthenticated);

// Middleware for managing user sessions and cart state
app.use((req, res, next) => {
    if(req.user) {
        res.locals.user = req.user.user;
    }

    if(!req.session.cart) {
        req.session.cart = new Array();
    }

    return next();
})

// Use imported routes
app.use("/", homeRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRoute);
app.use("/orders", orderRoute);
app.use("/admin", admin, adminRoute);


module.exports = app;