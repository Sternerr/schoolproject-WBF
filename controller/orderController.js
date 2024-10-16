const db = require("../db/db");
const asyncHandler = require("../middlewares/asyncHandler");

const ProductService = require("../db/services/productService");
const OrderService = require("../db/services/orderService");
const OrderItemService = require("../db/services/OrderItemService");

// @desc Get all orders for the authenticated user
// @access Private
const getOrders = asyncHandler(async (req, res) => {
    if(!req.user) {
        return res.redirect("/");
    }


    const orders = await OrderService.getUsersOrder(req.user.user.id);

    return res.render("ordersPage", { orders });  
});

// @desc Create a new order for the user based on the session cart
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    if(!req.user) {
        return res.redirect("/");
    }

    const cart = req.session.cart;
    const user = req.user;

    if(cart.length === 0) {
        return res.redirect("/cart");
    }

    const totalPrice = cart.reduce((acc, item) => acc + (item.product.price + item.product.stock), 0);

    const date = new Date();
    
    const order = await OrderService.create({
        userId: user.user.id, 
        orderDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        total: totalPrice,
    });

    cart.forEach(async (item) => {
        await OrderItemService.create({ 
            orderId: user.user.id, 
            productId: item.product.id,
            quantity: item.amount,
            price: totalPrice,
        })

        await ProductService.update({
            name: item.product.name,
            price: item.product.price,
            stock: (item.product.stock - item.amount),
            id: item.product.id,
        })
    });

    req.session.cart = new Array();

    return res.redirect("/cart");
})

module.exports = {
    getOrders,
    createOrder,
}