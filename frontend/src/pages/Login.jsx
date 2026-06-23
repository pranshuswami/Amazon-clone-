import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login =()=>{


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();



const login=async()=>{


try{


const res=await axios.post(

"http://localhost:5000/auth/login",

{

email,

password

}

);



localStorage.setItem(

"token",

res.data.token

);

alert("Login Successful");


window.location.href="/";

}
catch(error){


console.log(error);

alert("Invalid Login");


}


};



return(


<div className="bg-black text-white min-h-screen flex items-center justify-center">


<div className="bg-gray-800 p-8 rounded-lg w-96">


<h1 className="text-3xl font-bold mb-6">

Login

</h1>



<input

className="w-full p-3 bg-gray-700 rounded mb-4"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

className="w-full p-3 bg-gray-700 rounded mb-4"

placeholder="Password"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




<button

onClick={login}

className="bg-yellow-400 text-black w-full py-3 rounded font-bold"

>

Login

</button>



<p className="mt-5">


Don't have an account?


<span

onClick={()=>navigate("/register")}

className="text-blue-400 cursor-pointer ml-2"

>

Create Account

</span>


</p>



</div>


</div>


)


}


export default Login;