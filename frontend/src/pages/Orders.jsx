import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders =()=>{


const [orders,setOrders]=useState([]);
const navigate=useNavigate()



useEffect(()=>{


getOrders();


},[]);

const getOrders=async()=>{


try{


const res=await axios.get(

"http://localhost:5000/order",
{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);


setOrders(res.data.data);


}
catch(error){


console.log(error);


}


};

const cancelOrder=async(id)=>{


    try{


        await axios.delete(

            `http://localhost:5000/order/cancel/${id}`,
            {

                headers:{

                Authorization:

                `Bearer ${localStorage.getItem("token")}`

                 }

            }

        );


        alert("Order cancelled");


        getOrders();


    }
    catch(error){


        console.log(error);


    }


};





return(


<div className="bg-black text-white min-h-screen px-60 ">



<h1 className="text-3xl font-bold  pt-10 mb-6">

Your Orders

</h1>





<div className="space-y-5">



{

orders.map((order)=>(



<div

key={order.order_id}

className="bg-gray-800 p-5 rounded-lg"

>



<div className="flex justify-between">



<h2 className="text-xl font-bold">

Order #{order.order_id}

</h2>



<p className="text-green-400">

{order.order_status}

</p>



</div>





<p className="mt-3">

<span className="text-lg font-medium">Order Placed On: </span>{new Date(order.created_at).toLocaleDateString()}

</p>

<p className="mt-2 text-lg font-medium">

Address:

</p>



<p className="text-gray-300 ">

{order.house},

{order.street},<br />

{order.landmark},

{order.area},
<br />

{order.district},

{order.state},
<br />

{order.country}

</p>





<h3 className="font-bold text-xl mt-4">

₹{order.total_amount}

</h3>

<p className="text-lg font-semibold mt-2 text-">Arriving Thrusday</p>



<button

onClick={()=>navigate(`/order/${order.order_id}`)}
className="bg-yellow-400 active:scale-95 text-black px-5 py-2 rounded-full mt-4 font-bold"

>

View Order Details

</button>


{

order.order_status==="pending" &&


<button

onClick={()=>cancelOrder(order.order_id)}

className="bg-red-500 active:scale-95 text-white px-5 py-2 rounded-full mt-4 ml-3 font-bold"

>

Cancel Order

</button>

}




</div>



))


}





</div>




</div>



)
}
export default Orders;