const path = require("path");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const {
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
} = require("../controller/adminController");


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads"); 
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage });

// Defines routes and associate them with their respective controller functions
router.route("/products").get(getProductsPage);
router.route("/products/add").get(getProductsAddPage);
router.route("/products/add").post(upload.single("image"), addProduct);
router.route("/products/delete/:id").get(deleteProduct);
router.route("/products/modify/:id").get(getModifyProductPage);
router.route("/products/modify").post(upload.single("image"), modifyProduct);

router.route("/users").get(getUsersPage);
router.route("/users/add").get(getUsersAddPage);
router.route("/users/add").post(addUser);
router.route("/users/delete/:id").get(deleteUser);
router.route("/users/modify/:id").get(getModifyUserPage);
router.route("/users/modify").post(modifyUser);


module.exports = router;