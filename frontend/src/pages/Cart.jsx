import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        getCart();

    }, []);


    const getCart = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/cart",
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setCart(res.data.data);

        }
        catch(error) {

            console.log(error);

        }

    };


    const updateQuantity = async (cart_id, quantity) => {

        if(quantity < 1){

            return;

        }


        try {

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

                    item.cart_id === cart_id

                    ?

                    {
                        ...item,
                        quantity: quantity
                    }

                    :

                    item

                )

            );

            window.location.reload();

        }
        catch(error){

            console.log(error);

        }

    };


    const deleteItem = async (id) => {

        try {

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

                    (item)=>item.cart_id !== id

                )

            );


            window.location.reload();

        }
        catch(error){

            console.log(error);

        }

    };


    const deleteAll = async () => {

        try {

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

            window.location.reload();

        }
        catch(error){

            console.log(error);

        }

    };


    const subtotal = cart.reduce(

        (total,item)=>

        total + (Number(item.price) * item.quantity),

        0

    );


    return (

        <div className="min-h-screen bg-gray-100 p-3 md:p-6 md:py-11">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                <div className="lg:col-span-9 bg-white dark:bg-gray-800 p-4 md:p-6">


                    <h1 className="text-2xl md:text-4xl font-semibold mb-1">

                        Shopping Cart

                    </h1>


                    <p
                        onClick={deleteAll}
                        className="text-cyan-700 font-medium cursor-pointer mb-3"
                    >

                        Deselect all items

                    </p>

                    <p className="hidden md:block text-end text-gray-500 text-lg">Price</p>


                    <hr className="border-gray-300 dark:border-gray-700"/>


                    {
                        cart.map((item)=>(


                            <div

                                key={item.cart_id}

                                className="flex flex-col md:flex-row md:py-6 gap-6 ml-4"

                            >
                                <label className="flex items-center pt-14 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-blue-600"
                                        />

                                            

                                    </label>


                                <div className=" md:flex-shrink-0 flex justify-center">


                                    <img

                                        onClick={() =>
                                            navigate(`/product/${item.product_id}`)
                                        }

                                        src={item.image_url}

                                        className="w-full h-48 md:h-50 mt-6 object-contain cursor-pointer"

                                    />


                                </div>


                                <div className="col-span-5 mx-9 pr-9">
                                    
                                   

                                    <p

                                        onClick={() =>
                                            navigate(`/product/${item.product_id}`)
                                        }

                                        className="text-black dark:text-gray-300 mt-2 text-base md:text-2xl line-clamp-2 cursor-pointer"

                                    >

                                        {item.description}

                                    </p>


                                    <p className="text-green-500 font-bold text-sm">

                                        In stock

                                    </p>
                                    <label className="flex items-center mt-2 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-blue-600"
                                        />

                                         <span className="text-sm font px-1 ">This will be a Gift</span><span className="text-sm text-blue-700 ">Learn more</span>

                                    </label>


                                    <p className="text-black dark:text-gray-300 mt-2">

                                        <span className="font-bold ">Colour: </span><span className="font-normal"> Black</span>

                                    </p>


                                    <div className="flex items-center flex-row">
                                        <div className="flex w-fit mt-5 border-4 border-lime-300 rounded-full font-bold">


                                        <button

                                            disabled={item.quantity === 1}

                                            onClick={() =>
                                                updateQuantity(
                                                    item.cart_id,
                                                    item.quantity - 1
                                                )
                                            }

                                            className="px-4 py-1 rounded disabled:opacity-40"

                                        >

                                            <FiTrash2 className="text-black font-bold"/>

                                        </button>


                                        <span className=" px-4 py-1">

                                            {item.quantity}

                                        </span>


                                        <button

                                            onClick={() =>
                                                updateQuantity(
                                                    item.cart_id,
                                                    item.quantity + 1
                                                )
                                            }

                                            className="text-xl px-3 py-0.5 rounded"

                                        >

                                            +

                                        </button>


                                        

                                    </div>
                                <hr className="border border-gray-300 h-5 mt-4.5 ml-3" />
                                    <div className="flex  mt-4.5 ml-2">
                                        <button

                                            onClick={() =>
                                                deleteItem(item.cart_id)
                                            }

                                            className="text-cyan-600 hover:underline"

                                        >

                                            Delete

                                        </button>

                                    <hr className="border border-gray-300 h-5 mt-0.5 ml-3" />

                                        <button className="text-blue-400 ml-2 hover:underline">

                                            Save for later

                                        </button>

                                    <hr className="border border-gray-300 h-5 mt-0.5 ml-3" />

                                        <button className="text-blue-400 ml-2 hover:underline">

                                            See more like this

                                        </button>

                                    <hr className="border border-gray-300 h-5 mt-0.5 ml-3" />

                                        <button className="text-blue-400 ml-2 hover:underline">

                                            Share

                                        </button>
                                    </div>

                                    </div>



                                </div>


                                <div className="lg:col-span-3 -mr-1">


                                    <h2 className="text-xl mt-3 text-end font-bold">

                                        ₹{item.price}

                                    </h2>


                                    <p className=" hidden md:block text-end -ml-29 mt-2">

                                       Up to 5% back with<br /> Amazon Pay ICICI card
                                        
                                    </p>
                                    <p className="hidden md:block text-blue-700 text-end hover:text-black cursor-pointer">Terms</p>

                                </div>

                            
                            </div>

                        
                        ))

                    }


                   <hr className="border-gray-300 dark:border-gray-700" /> 


                    <h2 className="text-right text-lg md:text-2xl mb-5">

                        Subtotal ({cart.length} items): <span className="font-bold"> ₹{subtotal}</span>

                    </h2>

                    


                </div>


                <div className="lg:col-span-3">


                    <div className="bg-white dark:bg-gray-700 p-5">

                        <div className="flex">
                            <div className="relative bg-green-700 rounded-full px-1.5 text-white w-fit h-fit">✓</div>
                        <div className="px-2 text-base">
                            <h2 className="text-green-700 ">Part of your order qualifies for FREE Delivery.  
                            <span classname="text-gray-500"> Choose <span className="text-blue-600 underline">Free Delivery </span> option at checkout</span>
                            </h2>
                            
                        </div>
                        </div>

                        <h2 className="text-2xl mt-6">

                            Subtotal ({cart.length} items):<span className="font-bold"> ₹{subtotal}</span>

                        </h2>
                        <label className="flex items-center mt-2 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-blue-600"
                                        />

                                         <span className="text-lg font-medium px-1 ">This will be a Gift</span><span className="text-lg font-medium text-blue-700 ">Learn more</span>

                                    </label>


                        <h1 className="text-3xl font-bold mt-3">

                           

                        </h1>


                        <button

                            onClick={() => navigate("/checkout")}

                            className="bg-yellow-400 text-black rounded-full w-full py-2 mt-3 font-medium"

                        >

                            Proceed to Buy

                        </button>


                        <p className="mt-2 text-sm">

                            Save <span className="font-bold">₹10</span> extra using 💎
                            <span className="font-bold">100</span> Details

                        </p>

                        <div className="flex items-center justify-between px-5 py-4 my-5 border border-gray-300 rounded-b-lg">
                            <h2 className="text-lg font-medium">EMI Available</h2>
                            <h2 className="-mt-4 font-bold text-2xl">⌄</h2>
                        </div>


                    </div>


                    <div className="bg-blue-500 p-5 mt-3">


                        <p className="text-lg md:text-2xl text-white">

                            Hurry!

                            <span className="font-bold">

                                Limited Period Offer - get ₹100 off on Prime Shopping Edition!

                            </span>


                            <br />

                            FREE delivery, offers and multiple benefits - all in ONE membership!

                        </p>


                        <button className="bg-yellow-300 w-full px-2 py-1 mt-3 rounded-full font-medium text-black">

                            Join Prime Shopping Edition At

                            <br />

                            <span className="line-through">

                                ₹399

                            </span>

                            ₹299/year

                        </button>


                    </div>


                </div>


            </div>


        </div>

    );

};


export default Cart;