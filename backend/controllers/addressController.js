const db = require("../config/db");


const addAddress = (req,res)=>{


const user_id = req.user.user_id;


const {house,street,landmark,area,district,state,country}=req.body;



const sql ="INSERT INTO addresses (user_id,house,street,landmark,area,district,state,country) VALUES(?,?,?,?,?,?,?,?) "



db.query(sql,[user_id,house,street,landmark,area,district,state,country],(err,result)=>{


if(err){

return res.status(500).json({

success:false,
message:err.message

});

}



res.json({

success:true,
message:"Address saved"

});


}

);


};



const getAddress = (req,res)=>{


const user_id=1;



const sql="SELECT * FROM addresses WHERE user_id=? ORDER BY address_id DESC LIMIT 1 "



db.query(sql,[user_id],(err,result)=>{


if(err){

return res.status(500).json({

success:false,
message:err.message

});

}



res.json({

success:true,
data:result[0] || null

});


}

);


};



module.exports={

addAddress,
getAddress

};