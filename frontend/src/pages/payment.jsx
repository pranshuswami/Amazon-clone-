import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Payment =()=>{


const navigate = useNavigate();


const [method,setMethod]=useState("");



const payNow=()=>{


if(!method){

alert("Please select payment method");

return;

}



alert("Payment Successful");


navigate("/orders");


};



return(


<div className="bg-black text-white min-h-screen p-6">


<h1 className="text-3xl font-bold mb-6">

Choose Payment Method

</h1>



<div className="bg-gray-800 p-6 rounded-lg max-w-xl">



<label className="block mb-5">


<input

type="radio"

name="payment"

onChange={()=>setMethod("UPI")}

/>


<span className="ml-3">

UPI

</span>


</label>




<label className="block mb-5">


<input

type="radio"

name="payment"

onChange={()=>setMethod("Card")}

/>


<span className="ml-3">

Credit / Debit Card

</span>


</label>





<label className="block mb-5">


<input

type="radio"

name="payment"

onChange={()=>setMethod("COD")}

/>


<span className="ml-3">

Cash on Delivery

</span>


</label>






<button

onClick={payNow}

className="bg-yellow-400 text-black font-bold rounded-full w-full py-3 mt-5"

>

Place Order

</button>



</div>



</div>


)


}



export default Payment;