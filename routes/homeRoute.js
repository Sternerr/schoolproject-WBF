const express = require("express");
const router = express.Router();
const {
    getHome,
    getCatalogue,
    getAbout,
    getContact,
    getProduct,
} = require("../controller/homeController");


router.route("/").get(getHome);
router.route("/catalogue").get(getCatalogue);
router.route("/about").get(getAbout);
router.route("/contact").get(getContact);

module.exports = router;