import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CartSidebar = (product) => {
    
    const [cartItems, setCartItems] = useState([]);

    const navigate=useNavigate()

    useEffect(() => {
    getCartItems();
}, []);

const getCartItems = async () => {
    try {

        const res = await axios.get(
            "http://localhost:5000/cart",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        setCartItems(res.data.data);

    } catch (error) {
        console.log(error);
    }
};

    const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
);


    return (
        <div className="hidden md:block border-l sticky top-0  border-gray-400 h-full w-full overflow-y-auto bg-white shadow-md py-3">
            <div className="overflow-y-hidden">
                <div className=" flex flex-col gap-1 items-center ">
                    <h2 className="text-base">Subtotal</h2>
                    <h2 className="font-bold text-red-800 -mt-1.5 text-lg">₹{subtotal.toLocaleString()}</h2>
                </div>

                <div className="px-2">
                    <h2 className="text-green-700 leading-tight text-center">Part of your order qualifies for FREE Delivery. 
                        <span classname="text-gray-500">Select this option at checkout.</span>
                    </h2>
                    <h2 className="text-cyan-700 text-center underline cursor-pointer">Details</h2>
                </div>

                <button onClick={()=>navigate("/cart")}
                className="border border-gray-500 rounded-full mx-2 px-8 py-0.5 mt-2 cursor-pointer">Go to Cart</button>
            <hr className="border border-gray-200 mt-3" />
                {
    cartItems.map((item) => (
        <div key={item.cart_id}>

            <img
                src={item.image_url}
                className="w-full h-36 object-contain"
            />

            <h2 className="text-center text-lg font-semibold mb-5">
                ₹{item.price.toLocaleString()}
            </h2>

            <div className="flex justify-between rounded-full mx-4 px-2 py-1 items-center border-4 border-lime-400 mb-6">

                <button>
                    <FiTrash2 className="text-xl" />
                </button>

                <h2>{item.quantity}</h2>

                <button className="font-bold text-base">+</button>

            </div>

            <hr className="border border-gray-200 mt-3" />

        </div>
    ))
}
            </div>
        </div>
    );
};

export default CartSidebar;