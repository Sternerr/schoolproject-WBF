const asyncHandler = require("../middlewares/asyncHandler");


const getHome = asyncHandler(async (req, res) => {
    const array = new Array;
    const products = await ProductService.getAllProducts();

    for(let i = 0; i < 3; i++) {
        array.push(products[i]);
    }

    res.render("index", { activeTab: "home", products: array });
});

module.exports = {
    getHome
}