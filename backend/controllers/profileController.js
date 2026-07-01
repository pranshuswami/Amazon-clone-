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

const updateProfile = (req,res)=>{

    const user_id = req.user.user_id;

    const {name,phone,email,house,street,landmark,area,district,state,country} = req.body;
    
    const updateUser = 
    "UPDATE users SET name=?, phone=?, email=? WHERE user_id=?";

    db.query(updateUser,[name,phone,email,user_id],(err)=>{

            if(err){

                return res.status(500).json({
                    status:false,
                    message:err
                })

            }

            const updateAddress =
            "UPDATE addresses SET house=?, street=?, landmark=?, area=?, district=?, state=?, country=? WHERE user_id=?";


            db.query(updateAddress,[house,street,landmark,area,district,state,country,user_id],(err)=>{

                    if(err){

                        return res.status(500).json({
                            status:false,
                            message:err
                        })

                    }


                    res.json({

                        status:true,
                        message:"Profile updated"

                    })


                }

            )}
    )}

module.exports={
    getProfile,
    updateProfile
}