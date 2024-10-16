const bcrypt = require("bcrypt");

const { validateEmail, validatePassword} = require("../utils/validation");
const asyncHandler = require("../middlewares/asyncHandler");
const ProductService = require("../db/services/productService");
const UserService = require("../db/services/userService");

const salt = 10;

// @desc GET Product Page and products
// @access Private/Admin
const getProductsPage = asyncHandler(async (req, res) => {
    const products = await ProductService.getAll();

    res.render("productsPage", { products });
});

// @desc GET Product Add Page
// @access Private/Admin
const getProductsAddPage = asyncHandler(async (req, res) => {    
    res.render("addProductPage");
});

// @desc POST Product
// @access Private/Admin
const addProduct = asyncHandler(async (req, res) => {
    await ProductService.create({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image: `/assets/uploads/${req.file.filename}`
    });

    res.redirect("/admin/products");
});

// @desc DELETE Product
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    await ProductService.delete(req.params.id);

    res.redirect("/admin/products");
});

// @desc Modify Product
// @access Private/Admin
const getModifyProductPage = asyncHandler(async (req, res) => {
    const product = await ProductService.getById(req.params.id);

    res.render("modifyProductPage", { product });
});

// @desc Get Modify Product Page
// @access Private/Admin
const modifyProduct = asyncHandler(async (req, res) => {
    const { name, price, stock, id } = req.body;

    console.log(req.file.filename);

    if(req.file.filename) {
        await ProductService.update({ name, price, stock, image: `/assets/uploads/${req.file.filename}`, id });
    } else {
        await ProductService.update({ name, price, stock, image: null, id});
    }

    res.redirect("/admin/products");
});

// @desc GET Product Page and products
// @access Private/Admin
const getUsersPage = asyncHandler(async (req, res) => {
    const users = await UserService.getAll();

    res.render("usersPage", { users });
});

// @desc GET Product Add Page
// @access Private/Admin
const getUsersAddPage = asyncHandler(async (req, res) => {    
    res.render("addUserPage");
});

// @desc POST Product
// @access Private/Admin
const addUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(name && validateEmail(email) && validatePassword(password)) {
        let user = await UserService.authUser(email.toLowerCase());

        if(!user) {
            await UserService.create({
                name: name,
                email: email,
                password: await bcrypt.hash(password, salt),
                isAdmin: 0
            });
    
            res.redirect("/admin/users/add");
        } 
    } else {
        res.render("userAddPage", { 
            form: {
                name: (String(name).length <= 1) ? true : false,
                email: !validateEmail(email),
                password: !validatePassword(password),
            }
        });
    }
});

// @desc DELETE Product
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    await UserService.delete(req.params.id);

    return res.redirect("/admin/users");
});


// @desc Modify Product
// @access Private/Admin
const getModifyUserPage = asyncHandler(async (req, res) => {
    const user = await UserService.getById(req.params.id);

    return res.render("modifyUserPage", { user });
});

// @desc Get Modify Product Page
// @access Private/Admin
const modifyUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin, id} = req.body;

    const user = await UserService.getById(id);

    if(password) {
        await UserService.update({
            id,
            name: name,
            email: email,
            password: await bcrypt.hash(password, salt),
            isAdmin: isAdmin,
        });
        
        return res.redirect("/admin/users");
    } else {
        await UserService.update({
            id,
            name: name,
            email: email,
            password: user.password,
            isAdmin: isAdmin
        });
        
        return res.redirect("/admin/users");
    }
});

module.exports = {
    getProductsPage,
    getProductsAddPage,
    addProduct,
    deleteProduct,
    modifyProduct,
    getModifyProductPage,

    getUsersPage,
    getUsersAddPage,
    addUser,
    deleteUser,
    modifyUser,
    getModifyUserPage,
}