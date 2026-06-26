const express=require("express");

const router=express.Router();



const {

addToCart,
getCart,
removeFromCart,
updateQuantity,
clearCart,
getCartCount

}=require("../controllers/cartController");
const auth = require("../middleware/auth");





router.post(
"/add",
auth,
addToCart
);



router.get(
"/",
auth,
getCart
);

router.get(
"/count",
auth,
getCartCount
);

router.delete(
"/remove/:id",
auth,
removeFromCart
);

router.put(
"/update",
auth,
updateQuantity
);

router.delete(
"/clear",
auth,
clearCart
);



module.exports=router;