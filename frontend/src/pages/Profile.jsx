import { useEffect,useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Profile = () => {

    const [user, setUser] = useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        getProfile()
    },[])

    const getProfile=async()=>{
        const token=localStorage.getItem("token")
        if(!token){
            navigate(`/login`)
        }
        try{
            const res=await axios.get(`http://localhost:5000/profile`,{
                headers:{
                    Authorization:
                    `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUser(res.data.data)
        }
        catch(error){
            console.log(error)
        }
    }

    if(!user){
        return(
            <div className="min-h-screen flex items-center justify-center">

                Loading...

            </div>
        )
    }
  return (
    <div className="min-h-screen p-10">
        <div className="max-w-4xl mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg p-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold mt-4">
                        Personal Details:-
                    </h2>
                    <p className="">
                        <span className="font-bold">Name:</span>
                        {" "}
                        {user.name}
                    </p>
                    <p className="">
                        <span className="font-bold">Email:</span>
                        {" "}
                        {user.email}
                    </p>
                    <p className="">
                        <span className="font-bold">Phone Number:</span>
                        {" "}
                        {user.phone}
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold mt-4">Address:-</h2>
                    <p className=""> 
                        <span className="font-bold">House Number:</span>
                         {" "}
                        {user.house||" Address not found"}
                    </p>
                    <p className="">
                       <span className="font-bold">Street Number:</span>
                        {" "}
                       {user.street}
                    </p>
                    <p className=""> 
                        <span className="font-bold">Area:</span>
                         {" "}
                        {user.area}
                    </p>
                    <p className="">
                        <span className="font-bold">District:</span>
                         {" "}
                        {user.district}
                    </p>
                    <p className=""> 
                        <span className="font-bold">State:</span>
                        {" "}
                        {user.state}
                    </p>
                    <p className="">
                        <span className="font-bold">Country:</span>
                         {" "}
                        {user.country}
                    </p>
                </div>
            </div>
            <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full mt-8 hover:bg-yellow-500">Edit Profile</button>
        </div>
    </div>
  )
}

export default Profile