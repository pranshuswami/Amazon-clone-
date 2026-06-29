const db=require("../config/db")

const getProfile=(req,res)=>{
     const user_id=req.user.user_id

     const sql="SELECT users.user_id,users.name,users.phone,users.email,addresses.house,addresses.street,addresses.landmark,addresses.area,addresses.district,addresses.state,addresses.country FROM users LEFT JOIN addresses ON users.user_id=addresses.user_id WHERE users.user_id=?"

     db.query(sql,[user_id],(err,result)=>{
        if(err){
            return(res.status(500).json({
                status:false,
                message:err
            }))
        }
        res.status(200).json({
            status:true,
            message:"profile data given",
            data:result[0]
        })
     })
}

module.exports={

    getProfile

};