const express=require("express");

const router=express.Router();

const {
addReview,
getReviews,
getReviewProduct

}=require("../controllers/reviewController");

router.post(
"/add",
addReview
);

router.get(
"/:id",
getReviews
);

router.get("/product/:id", getReviewProduct);


module.exports=router;