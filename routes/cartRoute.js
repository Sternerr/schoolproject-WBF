const express = require("express");
const router = express.Router();
const {
    addToCart,
    getCart,
    removeFromCart,
} = require("../controller/cartController");



router.route("/").get(getCart);
router.route("/add").post(addToCart);
router.route("/remove/:productId").get(removeFromCart)


module.exports = router;