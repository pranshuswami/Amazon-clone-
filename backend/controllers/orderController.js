const db = require("../config/db");

const createOrder = (req,res)=>{

    const user_id = req.user.user_id;


    const {
        address_id,
        total_amount,
        items
    } = req.body;



    const orderSql =
    `
    INSERT INTO orders
    (user_id,address_id,total_amount,order_status)

    VALUES(?,?,?,'Pending')

    `;


    db.query(

        orderSql,

        [
            user_id,
            address_id,
            total_amount
        ],

        (err,result)=>{


            if(err){

                console.log(err);

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }



            const order_id=result.insertId;


            const itemValues = items.map((item)=>[

                order_id,
                item.product_id,
                item.quantity,
                item.price

            ]);



            const itemSql =
            `
            INSERT INTO order_items
            (order_id,product_id,quantity,price)

            VALUES ?

            `;



            db.query(

                itemSql,

                [itemValues],

                (err)=>{


                    if(err){

                        console.log(err);

                        return res.status(500).json({

                            success:false,
                            message:err.message

                        });

                    }



                    db.query(

                        "DELETE FROM cart WHERE user_id=?",

                        [user_id]

                    );



                    res.json({

                        success:true,

                        message:"Order created"

                    });


                }

            );



        }

    );


};



const getOrders = (req,res)=>{

    const user_id = req.user.user_id;


    const sql = 
    `
    SELECT

    orders.*,

    addresses.house,
    addresses.street,
    addresses.landmark,
    addresses.area,
    addresses.district,
    addresses.state,
    addresses.country


    FROM orders


    LEFT JOIN addresses

    ON orders.address_id = addresses.address_id


    WHERE orders.user_id = ?

    `;



    db.query(

        sql,

        [user_id],

        (err,result)=>{


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
const getOrderDetails = (req,res)=>{

    const {id}=req.params;


    const sql = 
    `
    SELECT 

    orders.*,

    addresses.house,
    addresses.street,
    addresses.landmark,
    addresses.area,
    addresses.district,
    addresses.state,
    addresses.country,


    products.product_name,
    products.description,
    products.image_url,

    order_items.quantity,
    order_items.price


    FROM orders


    LEFT JOIN addresses

    ON orders.address_id = addresses.address_id


    JOIN order_items

    ON orders.order_id = order_items.order_id


    JOIN products

    ON order_items.product_id = products.product_id


    WHERE orders.order_id=? AND orders.user_id=?

    `;



    db.query(sql,[id,req.user.user_id],(err,result)=>{


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




const cancelOrder = (req,res)=>{

    const {id}=req.params;


    const deleteItemsSql = 
    `
    DELETE FROM order_items
    WHERE order_id=? 
    `;


    db.query(

        deleteItemsSql,

        [id],

        (err)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:err.message

                });

            }


            const deleteOrderSql =

            `
            DELETE FROM orders
            WHERE order_id=?

            `;


            db.query(

                deleteOrderSql,

                [id],

                (err)=>{


                    if(err){

                        return res.status(500).json({

                            success:false,
                            message:err.message

                        });

                    }


                    res.json({

                        success:true,

                        message:"Order deleted successfully"

                    });


                }

            );


        }

    );


};

module.exports={

createOrder,
getOrders,
getOrderDetails,
cancelOrder

};