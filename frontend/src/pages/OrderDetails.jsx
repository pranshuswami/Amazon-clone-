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

        <div className=" min-h-screen px-4 md:px-10 lg:px-20 py-10">


            <h1 className="text-4xl font-bold mb-5">

                Order Details

            </h1>



            <div className="flex gap-3 lg:gap-5 text-lg mb-5">


                <p>

                    Order placed : {new Date(orderData.created_at).toLocaleDateString()}

                </p>


                <span>|</span>


                <p>

                    Order number : #{orderData.order_id}

                </p>


            </div>






            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-8 grid lg:grid-cols-3 gap-10">

                <div>


                    <h2 className="font-bold text-xl mb-3">

                        Ship to

                    </h2>


                    <p>

                        Pranshu Swami

                    </p>


                    <p className="mt-1"> 

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

                        Item(s) Subtotal: {orderData.price}

                    </p>


                    <p className="mt-3">

                        Shipping: Free Shipping

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

            className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mt-6 flex flex-col lg:flex-row justify-between"


            >
                

                   
                <div className="flex flex-col lg:flex-row gap-6 ">
                    

                    <div className="lg:w-1/2">
                        <img

                    onClick={() => navigate(`/product/${item.product_id}`)}

                    src={item.image_url}

                    className="w-full h-64 object-contain rounded cursor-pointer"

                    />
                    </div>



                    <div className="w-full md:w-3/4 md:mr-15">


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


                <div className="flex flex-wrap lg:flex-col gap-3 w-full lg:w-1/5 lg:h-52 ">


                    {

                        order.length > 0 && order[0].order_status === "pending" &&

                            <button

                                onClick={()=>cancelOrder(order[0].order_id)}

                                className="bg-yellow-300 active:scale-95 text-black px-3 py-1 rounded-full mt-5 text-sm lg:text-lg"

                            >

                                Cancel Order

                            </button>

                            

                    } 
                    <button className="active:scale-95 border text-black px-3 py-1 mt-5 lg:mt-0 rounded-full text-sm lg:text-lg">Track package</button>
                
                <div className="flex flex-row lg:flex-col gap-3 w-full ">

                    <button className="active:scale-95 border text-black px-2 py-1 mt-0.5 lg:mt-0 rounded-full  text-sm lg:text-lg">Ask Product Questions</button>

                    <button className="active:scale-95 border text-black px-2 py-1 mt-0.5 lg:mt-0 rounded-full  text-sm lg:text-lg">Ask Product Questions</button>
                    
                </div>

                </div>

            </div>



            ))

            }



        </div>

    );

};


export default OrderDetails;