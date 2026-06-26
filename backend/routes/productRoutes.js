const express = require("express");

const router = express.Router();


const {
    getProductsByCategory,
    getSingleProduct,
    searchProducts,
    getProducts

} = require("../controllers/productController");



router.get(
    "/category/:slug",
    getProductsByCategory
);


router.get(
    "/search/:keyword",
    searchProducts
);


router.get(
    "/:id",
    getSingleProduct
);


router.get(
    "/",
    getProducts
);



module.exports = router;