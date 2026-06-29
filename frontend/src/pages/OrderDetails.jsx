import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";


const OrderDetails = () => {

    const { id } = useParams();
    const navigate=useNavigate();

    const [order, setOrder] = useState([]);


    useEffect(() => {

        getOrder();

    }, []);



    const getOrder = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/order/${id}`,
                {

                headers:{

                    Authorization:

                    `Bearer ${localStorage.getItem("token")}`

                }

            }

            );


            setOrder(res.data.data);


        }
        catch(error) {

            console.log(error);

        }

    };
    const cancelOrder = async(id)=>{

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

        navigate("/orders");

    }
    catch(error){

        console.log(error);

    }

};
        



    if(order.length === 0){

        return (

            <div className="bg-black text-white min-h-screen p-10">

                Loading...

            </div>

        );

    }

    const orderData = order[0];



    return (

        <div className=" min-h-screen px-20 py-10">


            <h1 className="text-4xl font-bold mb-5">

                Order Details

            </h1>



            <div className="flex gap-5 text-lg mb-5">


                <p>

                    Order placed : {new Date(orderData.created_at).toLocaleDateString()}

                </p>


                <span>|</span>


                <p>

                    Order number : #{orderData.order_id}

                </p>


            </div>






            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-8 grid grid-cols-3 gap-10">

                <div>


                    <h2 className="font-bold text-xl mb-3">

                        Ship to

                    </h2>


                    <p>

                        Pranshu Swami

                    </p>


                    <p className="mt-0.5"> 

                        {orderData.house},{orderData.street}

                    </p>
                    <p>

                        {orderData.landmark}

                    </p>


                    <p>

                        {orderData.area}, {orderData.district}

                    </p>


                    <p>

                        {orderData.state}

                    </p>


                    <p>

                        {orderData.country}

                    </p>


                </div>

                <div>


                    <h2 className="font-bold text-xl mb-3">

                        Payment method

                    </h2>
                    <p>

                        Pay on Delivery

                    </p>


                </div>

                <div>


                    <h2 className="font-bold text-xl mb-3">

                        Order Summary

                    </h2>


                    <p>

                        Item(s) Subtotal:

                    </p>


                    <p className="mt-3">

                        Shipping: ₹40

                    </p>



                    <p className="mt-3 font-bold">

                        Grand Total:

                        ₹{orderData.total_amount}

                    </p>


                </div>
                



            </div>

            {

            order.map((item)=>(


            <div

            key={item.product_name}

            className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mt-6 flex justify-between"


            >
                

                   
                <div className="flex gap-6 ">
                    

                    <div className="w-1/4">
                        <img

                    onClick={() => navigate(`/product/${item.product_id}`)}

                    src={item.image_url}

                    className="w-full h-64 object-contain rounded cursor-pointer"

                    />
                    </div>



                    <div className="w-250 mr-15">


                        <h2 onClick={() => navigate(`/product/${item.product_id}`)}
                        className="text-xl font-bold cursor-pointer">

                            {item.product_name}

                        </h2>



                        <p onClick={() => navigate(`/product/${item.product_id}`)}
                        className=" text-black dark:text-gray-300 mt-3 line line-clamp-2 cursor-pointer">

                            {item.description}

                        </p>


                        <p className="dark:text-green-400 text-green-600 font-semibold mt-3">

                            Status : {item.order_status}

                        </p>

                        <p className="mt-3">

                            Quantity : {item.quantity}

                        </p>

                        <p className="font-bold mt-3">

                            ₹{item.price}

                        </p>


                    </div>


                </div>


                <div className="flex flex-col gap-3 w-1/2">


                    {

                        order.length > 0 && order[0].order_status === "pending" &&

                            <button

                                onClick={()=>cancelOrder(order[0].order_id)}

                                className="bg-red-500 active:scale-95 text-white px-5 py-2 rounded-full mt-5 font-bold"

                            >

                                Cancel Order

                            </button>

                    } 
                    
            



                </div>




            </div>



            ))

            }



        </div>

    );

};


export default OrderDetails;