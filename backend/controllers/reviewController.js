const db = require("../config/db");

const addReview = (req,res)=>{

const user_id = 1;

const {product_id,rating,comment}=req.body;

const sql ="INSERT INTO reviews (product_id,user_id,rating,comment) VALUES(?,?,?,?)"

db.query(sql,[product_id,user_id,rating,comment],(err,result)=>{

if(err){

return res.status(500).json({

success:false,

message:err.message

});

}



res.json({

success:true,

message:"Review added"

});


}


);



};





const getReviews=(req,res)=>{


const {id}=req.params;



const sql ="SELECT reviews.* FROM reviews WHERE product_id=? ORDER BY created_at DESC"

db.query(sql,[id],(err,result)=>{

if(err){

return res.status(500).json({

success:false,

message:err.message

});

}



res.json({

success:true,

data:result

});


}


);



};




module.exports={
addReview,
getReviews
};