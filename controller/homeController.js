const asyncHandler = require("../middlewares/asyncHandler");

const ProductService = require("../db/services/productService");

// @desc Get three products and Render Home
// @access Public
const getHome = asyncHandler(async (req, res) => {
    const array = new Array;
    const products = await ProductService.getAll();

    if(products && products.length > 3) {
        for(let i = 0; i < 3; i++) {
            array.push(products[i]);
        }
    } else if (products){
        for(let i = 0; i < products.length; i++) {
            array.push(products[i]);
        }
    }

    res.render("index", { activeTab: "home", products: array });
});

// @desc Get products, creates paginated list, and render catalogue
// @access Public
const getCatalogue = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 3;
    const offset = (page - 1) * itemsPerPage;

    const products = await ProductService.getAll(itemsPerPage, offset);
    const totalItems = await ProductService.getProductCount();
    const totalPages = Math.ceil(totalItems.count / itemsPerPage);

    res.render("catalogue", { 
        activeTab: "catalogue", 
        products,
        pagination: {
            currentPage: page,
            nextPage: (page + 1),
            prevPage: (page - 1),
            totalPages: totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages
        }
    });
})

// @desc Render About
// @access Public
const getAbout = asyncHandler(async (req, res) => {
    res.render("about", { activeTab: "about"} );
});

// @desc Render Contact
// @access Public
const getContact = asyncHandler(async (req, res) => {
    res.render("contact", { activeTab: "contact"} );
});

// @desc Render Contact
// @access Public
const getProduct = asyncHandler(async (req, res) => {
    res.render("productPage");
});

module.exports = {
    getHome,
    getCatalogue,
    getAbout,
    getContact,
    getProduct,
}