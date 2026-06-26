const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{

const token =
req.headers.authorization;

if(!token){

return res.status(401).json({

message:"No token"

});

}

const actualToken =
token.split(" ")[1];

try{


const decoded =
jwt.verify(

actualToken,

"AMAZON_SECRET"

);

req.user=decoded;

next();

}
catch(error){


res.status(401).json({

message:"Invalid token"

});


}


};


module.exports=auth;