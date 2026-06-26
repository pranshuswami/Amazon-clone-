const db = require("../config/db");

const addToCart = (req,res)=>{

const {product_id,quantity}=req.body;

const user_id=req.user.user_id;

const checkSql ="SELECT * FROM cart WHERE user_id=? AND product_id=?";


db.query(checkSql,[user_id,product_id],(err,result)=>{


if(err){

return res.status(500).json({
success:false,
message:err.message
});

}

if(result.length > 0){


const updateSql ="UPDATE cart SET quantity = quantity + 1 WHERE user_id=? AND product_id=?";


db.query(updateSql,[user_id,product_id],(err)=>{


if(err){

return res.status(500).json({
success:false,
message:err.message
});

}


res.json({

success:true,
message:"Quantity increased"

});


}

)}

else{


const insertSql ="INSERT INTO cart(user_id,product_id,quantity) VALUES(?,?,?)";


db.query(insertSql,[user_id,product_id,quantity],(err)=>{


if(err){

return res.status(500).json({
success:false,
message:err.message
})

}


res.json({

success:true,
message:"Product added"

})


}

)}


}

)}


const getCart = (req,res)=>{


const user_id = req.user.user_id;


const sql ="SELECT cart.cart_id,cart.quantity,products.* FROM cart JOIN products ON cart.product_id = products.product_id WHERE cart.user_id=? "



db.query(sql,[user_id],(err,result)=>{


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


});


};

const removeFromCart = (req,res)=>{


const {id}=req.params;
const user_id=req.user.user_id


const sql ="DELETE FROM cart WHERE cart_id=? AND user_id=?"



db.query(sql,[id,user_id],(err,result)=>{


if(err){

return res.status(500).json({
success:false,
message:err.message
});

}



res.json({

success:true,
message:"Item removed"

});


});


};


const updateQuantity = (req,res)=>{


const {cart_id,quantity}=req.body;



const sql ="UPDATE cart SET quantity=? WHERE cart_id=? "



db.query(sql,[quantity,cart_id],(err,result)=>{


if(err){

return res.status(500).json({
success:false,
message:err.message
});

}



res.json({

success:true,
message:"Quantity updated"

});


});


};



const clearCart=(req,res)=>{


const user_id=req.user.user_id;



const sql="DELETE FROM cart WHERE user_id=?"

db.query(sql,[user_id],(err,result)=>{


if(err){

return res.status(500).json({
success:false,
message:err.message
});

}



res.json({

success:true,
message:"Cart cleared"

});


});


};

const getCartCount = (req,res)=>{

    const user_id = req.user.user_id;


    const sql = "SELECT SUM(quantity) AS count FROM cart WHERE user_id=?";


    db.query(sql,[user_id],(err,result)=>{


        if(err){

            return res.status(500).json({

                success:false,

                message:err.message

            });

        }


        res.json({

            success:true,

            count:result[0].count || 0

        });


    });

};



module.exports={

addToCart,
getCart,
removeFromCart,
updateQuantity,
clearCart,
getCartCount

};