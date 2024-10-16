const express = require("express");
const router = express.Router();
const {
    getOrders,
    createOrder,
} = require("../controller/orderController");

const { isAuthenticated } = require("../middlewares/authMiddleware")


router.route("/").get(isAuthenticated, getOrders);
router.route("/create").get(isAuthenticated, createOrder);


module.exports = router;