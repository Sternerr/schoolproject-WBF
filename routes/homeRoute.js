const express = require("express");
const router = express.Router();
const {
    getHome,
    getCatalogue,
    getAbout,
    getContact,
    getProduct,
} = require("../controller/homeController");


// Defines routes and associate them with their respective controller functions
router.route("/").get(getHome);
router.route("/catalogue").get(getCatalogue);
router.route("/about").get(getAbout);
router.route("/contact").get(getContact);
router.route("/product").get(getProduct);


module.exports = router;