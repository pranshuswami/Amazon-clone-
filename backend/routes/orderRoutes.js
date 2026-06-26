const express = require("express");

const router = express.Router();


const {

    createOrder,
    getOrders,
    getOrderDetails,
    cancelOrder

} = require("../controllers/orderController");
const auth = require("../middleware/auth");



router.post(

    "/create",
    
    auth,

    createOrder

);


router.get(

    "/",
    auth,

    getOrders

);


router.get(

    "/:id",
    auth,

    getOrderDetails

);


router.delete(

    "/cancel/:id",
    auth,

    cancelOrder

);


module.exports = router;