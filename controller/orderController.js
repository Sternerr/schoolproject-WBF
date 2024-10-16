const db = require("../db/db");
const asyncHandler = require("../middlewares/asyncHandler");

const ProductService = require("../db/services/productService");
const OrderService = require("../db/services/orderService");
const OrderItemService = require("../db/services/OrderItemService");

const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderService.getUsersOrder(req.user.user.id);
    
    res.render("orders", { orders });  

});

const createOrder = asyncHandler(async (req, res) => {
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

    res.redirect("/cart");
})

module.exports = {
    getOrders,
    createOrder,
}