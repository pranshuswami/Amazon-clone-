const express=require("express");

const router=express.Router();

const {
addReview,
getReviews,
getReviewProduct

}=require("../controllers/reviewController");
const auth = require("../middleware/auth");

router.post(
"/add",
auth,
addReview
);

router.get(
"/:id",
auth,
getReviews
);

router.get(
    "/product/:id",
    auth,
     getReviewProduct);


module.exports=router;