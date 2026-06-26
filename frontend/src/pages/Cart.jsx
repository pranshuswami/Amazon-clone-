import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart =()=>{
  


const [cart,setCart]=useState([]);
const navigate=useNavigate()

useEffect(()=>{

getCart();

},[]);



const getCart = async()=>{


try{


const res = await axios.get(

"http://localhost:5000/cart",

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);


setCart(res.data.data);


}
catch(error){

console.log(error);

}


};
const updateQuantity=async(cart_id,quantity)=>{


if(quantity<1){

return;

}



try{


await axios.put(
"http://localhost:5000/cart/update",
{
cart_id,
quantity
},
{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}
);


setCart(

cart.map((item)=>

item.cart_id===cart_id

?

{
...item,
quantity:quantity
}

:

item

)

);



}
catch(error){

console.log(error);

}

};




const deleteItem=async(id)=>{


try{


await axios.delete(

`http://localhost:5000/cart/remove/${id}`,
{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);


setCart(

cart.filter(

(item)=>item.cart_id!==id

)

);


}
catch(error){

console.log(error);

}

};




const deleteAll=async()=>{


try{


await axios.delete(
"http://localhost:5000/cart/clear",
{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}
);


setCart([]);


}
catch(error){

console.log(error);

}

};





const subtotal=cart.reduce(

(total,item)=>

total+(Number(item.price)*item.quantity),

0

);



return(


<div className=" min-h-screen p-6">


<div className="grid grid-cols-12 gap-6">



<div className="col-span-9 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">



<h1 className="text-3xl font-bold mb-5">

Shopping Cart

</h1>




<p

onClick={deleteAll}

className="text-blue-400 cursor-pointer mb-3"

>

Delete all items

</p>

<hr className="border-gray-300 dark:border-gray-700 " />

{

cart.map((item)=>(


<div

key={item.cart_id}

className="grid grid-cols-12 gap-5  py-6"

>


<div className="col-span-3">


<img
onClick={() => navigate(`/product/${item.product_id}`)}
src={item.image_url}

className="w-full h-64 object-contain cursor-pointer"

 />


</div>



<div className="col-span-6">


<h2 
onClick={() => navigate(`/product/${item.product_id}`)} className="text-xl font-bold cursor-pointer" >

{item.product_name}

</h2>

<p 
onClick={() => navigate(`/product/${item.product_id}`)} className="text-black dark:text-gray-300 mt-2 cursor-pointer">

{item.brand}

</p>
 <p 
 onClick={() => navigate(`/product/${item.product_id}`)} 
 className="text-black dark:text-gray-300 mt-2 text-xl line-clamp-2 cursor-pointer">

                {item.description}

            </p>


<p className="text-green-500 font-bold mt-3">

In stock

</p>


<p className="text-black dark:text-gray-300 mt-2">

FREE delivery Wed, 24 Jun

</p>


<div className="flex gap-3 mt-5">


<button

disabled={item.quantity===1}

onClick={()=>updateQuantity(

item.cart_id,

item.quantity-1

)}

className="border px-4 py-1 rounded disabled:opacity-40"

>

-

</button>


<span className="border px-4 py-1">

{item.quantity}

</span>



<button

onClick={()=>updateQuantity(

item.cart_id,

item.quantity+1

)}

className="border px-4 py-1 rounded"

>

+

</button>


<button

onClick={()=>deleteItem(item.cart_id)}

className="text-blue-400 ml-5 hover:underline"

>

Delete

</button>

<button className="text-blue-400 ml-5 hover:underline">

Save for later

</button>

</div>

</div>


<div className="col-span-3">


<h2 className="text-xl font-bold">

₹{item.price}

</h2>


<p className="text-gray-400 line-through mt-2">

M.R.P ₹{item.mrp}
</p>


<p className="text-green-400 mt-2">

FREE delivery

</p>


</div>



</div>


))

}




<hr className="border-gray-300 dark:border-gray-700" />
<h2 className="text-right text-xl font-bold mt-5">

Subtotal ({cart.length} items): ₹{subtotal}

</h2>



</div>





<div className="col-span-3">


<div className="bg-gray-200 dark:bg-gray-700 p-5 rounded-lg">


<h2 className="text-xl font-bold">

Subtotal ({cart.length} items)

</h2>



<h1 className="text-3xl font-bold mt-3">

₹{subtotal}

</h1>



<button 
onClick={()=>navigate("/checkout")}
className="bg-yellow-400 text-black rounded-full w-full py-3 mt-5 font-bold">

Proceed to Buy

</button>
<p className="mt-2">Save <span className="font-bold">₹10</span> extra using 💎<span className="font-bold">100</span>Details</p>


</div>
<div className="bg-blue-500 p-5 mt-3 ">
  <p className="text-2xl text-white">Hurry! <span className="font-bold"> Limited Period Offer - get ₹100 off on Prime Shopping Edition!</span>
  <br />
FREE delivery, offers and multiple benefits - all in ONE membership!

</p>
<button className="bg-yellow-300 w-full px-2 py-1  mt-3 rounded-full font-medium text-black">Join Prime Shopping Edition At
  <br />
  <span className="line-through">₹399</span> ₹299/year</button>
</div>


</div>



</div>


</div>


)

}



export default Cart;