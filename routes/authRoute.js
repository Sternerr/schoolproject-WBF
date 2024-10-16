const express = require("express");
const router = express.Router();

const {
    authUser,
    registerUser,
    logoutUser,
} = require("../controller/userController")


router.get("/login", (req, res) => {
    if(req.cookies.jwt) {
        res.redirect("/");
    }

    res.render("loginPage");
});

router.get("/register", (req, res) => {
    res.render("registerPage");
});

router.route("/logout").get(logoutUser);
router.route("/login").post(authUser);
router.route("/register").post(registerUser);



module.exports = router;