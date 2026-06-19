const express = require("express");

const router = express.Router();


const {
    getProductsByCategory,
    getSingleProduct,
    searchProducts

} = require("../controllers/productController");



router.get(
    "/category/:slug",
    getProductsByCategory
);


router.get(
    "/:id",
    getSingleProduct
);


router.get(
    "/search/:keyword",
    searchProducts
);



module.exports = router;