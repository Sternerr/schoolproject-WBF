const asyncHandler = require("../middlewares/asyncHandler");

const ProductService = require("../db/services/productService");


const addToCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const index = req.session.cart.findIndex(p => p.product.id == parseInt(productId) );


    if(index < 0) {
        const product = await ProductService.getById(productId);

        req.session.cart.push({
            product,
            amount: 1,
        });

    } else {
        if(req.session.cart[index].amount < req.session.cart[index].product.stock) {
            req.session.cart[index].amount += 1;
        }
    }

    res.json({ message: "Product added to cart" });
});

const getCart = asyncHandler(async (req, res) => {
    let totalPrice = 0;
    
    if(req.session.cart.length > 0) {
        totalPrice = req.session.cart.reduce((acc, item) => acc + (item.product.price * item.amount), 0);
    }

    res.render("cart", { cart: req.session.cart, totalPrice })
});

const removeFromCart = asyncHandler(async (req, res) => {
    const productId = req.params.productId;

    req.session.cart = req.session.cart.filter(p => p.product.id !== parseInt(productId) );

    res.redirect("/cart");
});

module.exports = {
   addToCart,
   getCart,
   removeFromCart
}