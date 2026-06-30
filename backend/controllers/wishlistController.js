const db = require("../config/db");


const addWishlist = (req,res)=>{

    const user_id = req.user.user_id;

    const {product_id} = req.body;


    const checkSql = 
    "SELECT * FROM wishlist WHERE user_id=? AND product_id=?";


    db.query(checkSql,[user_id,product_id],(err,result)=>{

            if(err){

                return res.status(500).json({

                    success:false,

                    message:err.message

                });

            }


            if(result.length > 0){

                return res.json({

                    success:false,

                    message:"Already in wishlist"

                });

            }



            const sql = 
            "INSERT INTO wishlist(user_id,product_id) VALUES(?,?)";


            db.query(

                sql,

                [user_id,product_id],

                (err)=>{


                    if(err){

                        return res.status(500).json({

                            success:false,

                            message:err.message

                        });

                    }



                    res.json({

                        success:true,

                        message:"Added to wishlist"

                    });


                }

            );


        }

    );


};



const getWishlist = (req,res)=>{


    const user_id = req.user.user_id;


    const sql = "SELECT wishlist.wishlist_id,products.* FROM wishlist JOIN products ON wishlist.product_id = products.product_id WHERE wishlist.user_id=? "

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


        }

    );


};



const removeWishlist = (req,res)=>{


    const user_id = req.user.user_id;

    const {id} = req.params;



    const sql = 
    "DELETE FROM wishlist WHERE wishlist_id=? AND user_id=?";



    db.query(sql,[id,user_id],(err)=>{

            if(err){

                return res.status(500).json({

                    success:false,

                    message:err.message

                });

            }



            res.json({

                success:true,

                message:"Removed"

            });


        }

    );


};



module.exports = {

    addWishlist,

    getWishlist,

    removeWishlist

};