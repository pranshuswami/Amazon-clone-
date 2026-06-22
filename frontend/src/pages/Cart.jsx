import { useEffect, useState } from "react";
import axios from "axios";


const Cart =()=>{


const [cart,setCart] = useState([]);

useEffect(()=>{

getCart();

},[]);



const getCart = async()=>{


try{


const res = await axios.get(
"http://localhost:5000/cart"
);


setCart(res.data.data);


}
catch(err){

console.log(err);

}

};

const updateQuantity = async(cart_id, quantity)=>{


if(quantity < 1){
    return;
}
try{
await axios.put(
"http://localhost:5000/cart/update",
{
cart_id,
quantity
}
);

getCart();


}
catch(err){

console.log(err);

}
};

const deleteItem = async(id)=>{
try{

await axios.delete(
`http://localhost:5000/cart/remove/${id}`
);


getCart();


}
catch(err){

console.log(err);

}
};

const deleteAll = async()=>{
try{
await axios.delete(
"http://localhost:5000/cart/clear"
);
setCart([]);
}
catch(err){

console.log(err);

}
};

const subtotal = cart.reduce(
(total,item)=> total + Number(item.price)* item.quantity,
0
);

return (
<div className="bg-black text-white min-h-screen p-6 ">


<div className="grid grid-cols-12 gap-6">
<div className="col-span-9 bg-gray-800 p-6 rounded">

<h1 className="text-3xl font-semibold mb-5">

Shopping Cart

</h1>

<p onClick={deleteAll} className="text-blue-600 mb-5 cursor-pointer">

Delete all items

</p>
<hr/>

{
cart.map((item)=>(


<div 
key={item.cart_id}
className="flex gap-6 py-6 border-b"
>
<div className="w-52">


<img

src={item.image_url}

className="w-full h-48 object-contain"
/>
</div>

<div className="flex-1">


<h2 className="text-xl font-semibold">

{item.product_name}

</h2>

<p className="text-gray-100 font-medium mt-2">

{item.brand}

</p>

<p className="text-green-700 font-bold mt-3">

In stock

</p>

<p className="mt-3 font-bold">

Rs {item.price}

</p>
<div className="flex gap-3 mt-5">


<button

onClick={()=>updateQuantity(
item.cart_id,
item.quantity-1
)}

className="border px-4 py-2 rounded-full">-
</button>

<span className="px-3 py-2 border">

{item.quantity}

</span>

<button

onClick={()=>updateQuantity(
item.cart_id,
item.quantity+1
)}

className="border px-4 py-2 rounded-full"> +

</button>

<button

onClick={()=>deleteItem(item.cart_id)}

className="text-blue-600 hover:underline ml-5"

>

Delete

</button>

</div>

</div>

</div>
))
}
<h2 className="text-xl  text-right mt-5 font-bold">

Subtotal ({cart.length} item): {subtotal} Rs

</h2>
</div>

<div className="col-span-3">

<div className="bg-gray-700 p-5 rounded">


<h2 className="text-xl font-semibold">

Subtotal ({cart.length} item):

</h2>

<h1 className="text-2xl font-bold mt-2">

 {subtotal} Rs

</h1>

<button

className="bg-yellow-400 font-bold active:scale-95 w-full rounded-full py-3 mt-5"

>

Proceed to Buy

</button>
<p className="mt-2">Save <span className="font-bold"> ₹10</span>  extra using 💎<span className="font-bold "> 100 </span></p>




</div>
<div className="bg-blue-700 mt-5 rounded px-3 py-2 text-2xl">Hurry!<span className="font-bold "> Limited Period Offer - get ₹100 off on Prime Shopping Edition!
</span><br />
<span className="">FREE delivery, offers and multiple benefits - all in ONE membership!</span>
<button className="bg-yellow-300 rounded-full text-black my-3 text-lg w-85 px-4 py-3">Join Prime Shopping Edition at<br /><span className="line-through">₹399</span> ₹299/year</button>
</div>
</div>
</div>
</div>
)

}


export default Cart;