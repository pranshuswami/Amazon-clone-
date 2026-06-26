const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{

const {name,email,password}=req.body;

const hashedPassword = await bcrypt.hash(
    password,
    10
);


const sql ="INSERT INTO users (name,email,password,role) VALUES(?,?,?,'customer')"

db.query(sql,[name,email,hashedPassword],(err,result)=>{

if(err){

return res.status(500).json({

success:false,
message:err.message

});

}



res.json({

success:true,

message:"User registered"

});


}

);


};

const login = (req,res)=>{


const {email,password}=req.body;

const sql ="SELECT * FROM users WHERE email=?"

db.query(sql,[email],async(err,result)=>{


if(err){

return res.status(500).json({

message:err.message

});

}

if(result.length===0){

return res.status(400).json({

message:"User not found"

})

}
const user=result[0];

const match =await bcrypt.compare(password,user.password);

if(!match){

return res.status(400).json({

message:"Wrong password"

});

}

const token = jwt.sign(

{

user_id:user.user_id,

email:user.email,

role:user.role

},

"AMAZON_SECRET",

{

expiresIn:"7d"

}

);



res.json({

success:true,

token

});



}

);


};



module.exports={

register,
login

};