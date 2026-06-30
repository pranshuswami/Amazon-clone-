const express = require("express");

const router = express.Router();


const auth = require("../middleware/auth");


const {

    addWishlist,

    getWishlist,

    removeWishlist

} = require("../controllers/wishlistController");



router.post(

    "/add",

    auth,

    addWishlist

);



router.get(

    "/",

    auth,

    getWishlist

);



router.delete(

    "/remove/:id",

    auth,

    removeWishlist

);



module.exports = router;