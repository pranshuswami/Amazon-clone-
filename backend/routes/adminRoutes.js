const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth");

const adminMiddleware = require("../middleware/adminMiddleware");

router.get(

"/dashboard",

verifyToken,

adminMiddleware,

(req,res)=>{

res.json({

success:true,

message:"Welcome Admin"

});

}

);

module.exports = router;