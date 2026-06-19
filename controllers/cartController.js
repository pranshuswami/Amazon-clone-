const db = require("../config/db");



const addToCart = (req,res)=>{

    const {product_id} = req.body;


    const user_id = 1; 


    const sql ="INSERT INTO cart(user_id,product_id,quantity) VALUES(?,?,1)"


    db.query(sql,[user_id,product_id],(err,result)=>{


            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }


            res.json({

                success:true,
                message:"Product added to cart"

            });


        }
    );

};




const getCart = (req,res)=>{


const user_id = 1;


const sql ="SELECT cart.cart_id,products.*FROM cart JOIN products ON cart.product_id = products.product_id WHERE cart.user_id=?"



db.query(sql,[user_id],(err,result)=>{


if(err){

return res.status(500).json({
success:false,
message:err
});

}



res.json({

success:true,
data:result

});


});


};
const removeFromCart = (req,res)=>{

    const {id} = req.params;


    const sql =
    "DELETE FROM cart WHERE cart_id = ?";


    db.query(
        sql,
        [id],

        (err,result)=>{

            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }


            res.json({

                success:true,
                message:"Item removed from cart"

            });


        }
    );

};



module.exports={
addToCart,
getCart,
removeFromCart
};