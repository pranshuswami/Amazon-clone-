const express = require("express");

const router = express.Router();


const {
    getProductsByCategory,
    getSingleProduct,
    searchProducts,
    getProducts,
    getProductImages

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

router.get(
    "/:id/images",
    getProductImages
);



module.exports = router;