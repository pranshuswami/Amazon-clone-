import { useEffect,useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItem, setCartItem] = useState([])
   
     const navigate=useNavigate()
    useEffect(()=>{
      axios.get(`http://localhost:5000/cart`)
      .then((res)=>{
        setCartItem(res.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })

    },[])

    const removeItem = (cart_id)=>{


axios
.delete(
`http://localhost:5000/cart/remove/${cart_id}`
)

.then(()=>{


setCartItem(
cartItem.filter(
(item)=>item.cart_id !== cart_id
)
);


})


.catch((err)=>{

console.log(err);

});


};

  return (
    <div className="bg-black  text-white min-h-screen p-8">
        <h1 className="text-3xl font-bold p-6">My Cart</h1>

       <div className="grid grid-cols-3 gap-10 w-270">
         {cartItem.length===0 ? (
          <h2 className="text-2xl">
            Your Cart is Empty
          </h2>
        ) : (
          cartItem.map((item)=>(
             <div
              key={item.product_id}
              className="bg-gray-900 border  border-gray-800 p-4 rounded"
             
             >

              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-64 h-64 rounded-lg object-cover"
              />

              <h2 className="font-bold text-gray-100 mt-3">
                {item.product_name}
              </h2>

              <p className="text-green-600 font-bold">
                {item.price} Rs
              </p>

              <p className="text-sm text-gray-300">
                {item.brand}
              </p>
             
                <div className="mt-3">
                  <button 
                 onClick={() =>
                 navigate(`/product/${item.product_id}`)  }             
                 className="w-fit bg-blue-500 mr-1 hover:bg-blue-600 active:scale-95 text-white px-2 py-1  rounded-full font-semibold transition"
                     >
                    View Item
                </button>
                  <button className="w-fit mr-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-2 py-1 rounded-full font-semibold transition"
                     >
                         Buy Now
                </button>
                <button onClick={()=>removeItem(item.cart_id)} className="w-fit bg-red-500 hover:bg-red-600 active:scale-95 text-white px-2 py-1 rounded-full font-semibold transition"
                     >
                    Discard Item
                </button>
                
                

                </div>
                 

            </div>
          ))
        )}
       

</div>

    </div>
  )
}

export default Cart