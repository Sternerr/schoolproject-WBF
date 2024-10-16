const express = require("express");
const router = express.Router();
const {
    getOrders,
    createOrder,
} = require("../controller/orderController");



router.route("/").get(getOrders);
router.route("/create").get(createOrder);


module.exports = router;