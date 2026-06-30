import {useEffect,useState} from "react";
import axios from "axios";
import {FiTrash2} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const Wishlist =()=>{

    const navigate=useNavigate()
    const [wishlist,setWishlist]=useState([]);



    useEffect(()=>{

        getWishlist();

    },[]);



    const getWishlist=async()=>{


        try{


            const res=await axios.get(

                "http://localhost:5000/wishlist",

                {

                    headers:{

                        Authorization:

                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            setWishlist(res.data.data);


        }

        catch(error){

            console.log(error);

        }


    };



    const removeWishlist=async(id)=>{


        try{


            await axios.delete(

                `http://localhost:5000/wishlist/remove/${id}`,

                {

                    headers:{

                        Authorization:

                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            getWishlist();


        }

        catch(error){

            console.log(error);

        }


    };




    const addToCart=async(product_id)=>{


        try{


            await axios.post(

                "http://localhost:5000/cart/add",

                {

                    product_id,

                    quantity:1

                },

                {

                    headers:{

                        Authorization:

                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            alert("Added to cart");


        }

        catch(error){

            console.log(error);

        }


    };




    return(


        <div className="min-h-screen p-6 bg-gray-100 dark:bg-black">

           


            <div className="flex border rounded-2xl px-2 py-2 gap-6">



                <div className="w-72 bg-gray-200 dark:bg-gray-800 h-fit p-5 rounded-lg hover:text-orange-400">


                    <h2 className="text-xl font-bold">

                        Shopping List

                    </h2>


                    <p className="mt-3 text-gray-500">

                        Default List

                    </p>


                </div>





                <div className="flex-1 bg-gray-200 dark:bg-gray-900 p-6 rounded-lg">


                    <div className="flex justify-between items-center">


                        <h1 className="text-3xl font-bold">

                            Shopping List

                            <span className="text-gray-500 text-lg ml-3">

                                Private

                            </span>

                        </h1>



                        <button

                        className="border px-5 py-2 rounded-full"

                        >

                            Add item

                        </button>


                    </div>


                <hr className="border-gray-300 mt-7" />



                    <div className="mt-8">



                    {

                    wishlist.map((item)=>(


                        <div

                        key={item.wishlist_id}

                        className=" rounded-lg p-5 flex gap-8 mb-5"


                        >



                            <img
                            onClick={()=>navigate(`/product/${item.product_id}`)}

                            src={item.image_url}

                            className="w-52 h-52 object-contain cursor-pointer"

                            />




                            <div className="flex-1">


                                <h2 onClick={()=>navigate(`/product/${item.product_id}`)}
                                className="text-xl font-bold text-blue-600 cursor-pointer">


                                    {item.product_name ||"No item in wishlist"}


                                </h2>

                                <p onClick={()=>navigate(`/product/${item.product_id}`)}
                                className="line-clamp-2 mt-2">{item.description}</p>




                                <p className="mt-2">

                                    {item.brand}

                                </p>




                                <div className="mt-3 text-yellow-600">


                                 {item.rating}/5 ({item.reviews})


                                </div>




                                <h2 className="text-2xl font-bold mt-3">


                                    ₹{item.price}
                                    <span className="line-through text-sm text-gray-400"> M.R.P:₹{item.mrp}</span>


                                </h2>

                                




                                <p className="text-green-600 mt-2">


                                    FREE Delivery


                                </p>




                                <p className="mt-4">


                                    Item added to wishlist


                                </p>





                                <div className="flex gap-4 mt-6">



                                    <button

                                    onClick={()=>addToCart(item.product_id)}

                                    className="bg-yellow-400 px-6 py-2 rounded-full font-bold text-black"

                                    >


                                        Add to Cart


                                    </button>





                                    <button

                                    onClick={()=>removeWishlist(item.wishlist_id)}

                                    className="border px-5 py-2 rounded-full"

                                    >


                                        <FiTrash2/>


                                    </button>



                                </div>



                            </div>



                        </div>



                    ))

                    }



                    </div>

                    <h2 className="">End of list</h2>

                </div>



            </div>



        </div>


    );


};



export default Wishlist;