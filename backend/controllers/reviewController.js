const db = require("../config/db");

const addReview = (req,res)=>{

const user_id = req.user.user_id;

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

const getReviewProduct = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            product_id,
            product_name,
            description,
            image_url,
            price,
            brand
        FROM products
        WHERE product_id=?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.json({
            success: true,
            data: result[0]
        });

    });

};

module.exports = {

    addReview,
    getReviews,
    getReviewProduct

};