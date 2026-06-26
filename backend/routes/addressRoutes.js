const express=require("express");

const router=express.Router();


const {

addAddress,
getAddress

}=require("../controllers/addressController");
const auth = require("../middleware/auth");



router.post(
"/add",
auth,
addAddress
);



router.get(
"/",
auth ,
getAddress
);



module.exports=router;