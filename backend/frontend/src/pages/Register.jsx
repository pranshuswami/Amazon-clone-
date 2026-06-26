import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Register=()=>{


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();



const register=async()=>{


try{


await axios.post(

"http://localhost:5000/auth/register",

{

name,

email,

password

}

);



alert("Account created");


navigate("/login");


}
catch(error){


console.log(error);


}


};



return(


<div className=" min-h-screen flex items-center justify-center">


<div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg w-96">


<h1 className="text-3xl font-bold mb-6">

Create Account

</h1>



<input

className="w-full p-3 bg-gray-300 dark:bg-gray-700 rounded mb-4"

placeholder="Name"

onChange={(e)=>setName(e.target.value)}

/>



<input

className="w-full p-3 bg-gray-300 dark:bg-gray-700 rounded mb-4"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>



<input

className="w-full p-3 bg-gray-300 dark:bg-gray-700 rounded mb-4"

placeholder="Password"

type="password"

onChange={(e)=>setPassword(e.target.value)}

/>



<button

onClick={register}

className="bg-yellow-400 text-black w-full py-3 rounded font-bold"

>

Create Account

</button>



</div>


</div>


)

}


export default Register;