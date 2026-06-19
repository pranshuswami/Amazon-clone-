const express=require("express")

const router =express.Router()

const{
    addToCart,
    getCart,
    removeFromCart
}=require("../controllers/cartController")
const { get } = require("./categoryRoutes")

router.post(
    "/add",
    addToCart)


router.get(
    "/",
    getCart
)

router.delete(
"/remove/:id",
removeFromCart
);

module.exports=router