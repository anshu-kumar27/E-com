const express = require("express");
const { getAllProducts ,createProduct , updateProduct, deleteProduct, getOneProduct, createProductreview, getProductReviews, deleteReview } = require("../controllers/productc");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

// to get all of the products 
router.route("/products").get(getAllProducts);

//to create a new product 
router.route("/admin/products/new").post(isAuthenticatedUser,authorizedRoles('admin'),createProduct);

//to update / delete / get a single product 
router.route("/admin/products/:id")
.put(isAuthenticatedUser,authorizedRoles('admin'),updateProduct)
.delete(isAuthenticatedUser,authorizedRoles('admin'),deleteProduct)

router.route("/product/:id").get(getOneProduct);

router.route("/review").put(isAuthenticatedUser,createProductreview).delete(isAuthenticatedUser,deleteReview);

router.route("/reviews").get(getProductReviews);

module.exports = router;