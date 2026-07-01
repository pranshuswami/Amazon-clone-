import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Checkout = () => {

    const [cart, setCart] = useState([]);

    const [showAddressBox, setShowAddressBox] = useState(false);

    const [address, setAddress] = useState({

        house:"",
        street:"",
        landmark:"",
        area:"",
        district:"",
        state:"",
        country:""

    });


    const navigate = useNavigate();


    useEffect(()=>{


    const token = localStorage.getItem("token");


    if(!token){

        navigate("/login");

        return;

    }


    getCart();

    getAddress();


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



    const getAddress = async()=>{

    try{

        const res = await axios.get(
            "http://localhost:5000/address",
            {

                headers:{

                Authorization:

                `Bearer ${localStorage.getItem("token")}`

            }

        }
        );


        console.log("ADDRESS DATA:",res.data);


        if(res.data.data){

            setAddress(res.data.data);

        }


    }
    catch(error){

        console.log(error);

    }

};


    const saveAddress = async()=>{

        try{

            await axios.post(
                "http://localhost:5000/address/add",
                address,
                {

                    headers:{

                    Authorization:

                    `Bearer ${localStorage.getItem("token")}`

                }

            }
            );


            setShowAddressBox(false);

            getAddress();

        }
        catch(error){

            console.log(error);

        }

    };



    const total = cart.reduce(

        (sum,item)=>

        sum + Number(item.price) * item.quantity,

        0

    );



    const placeOrder = async()=>{


        if(!address.house){

            alert("Please add delivery address");

            return;

        }


        try{

            const orderItems = cart.map((item)=>({

                product_id:item.product_id,

                quantity:item.quantity,

                price:item.price

            }));


            await axios.post(

"http://localhost:5000/order/create",

{

    address_id:address.address_id,

    total_amount:total,

    items:orderItems

},
{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);


            alert("Order Created Successfully");


            navigate("/payment");


        }
        catch(error){

            console.log(error);

            alert("Order Failed");

        }

    };



    return(

        <div className=" min-h-screen p-6">


            <h1 className="text-3xl font-bold mb-6">

                Checkout

            </h1>



            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                <div className="lg:col-span-8 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">


                    <div className="bg-gray-300 dark:bg-gray-700 text-black  dark:text-white p-5 rounded-lg">


                        <h2 className="text-xl font-bold">

                            Delivery Address

                        </h2>



                        {

                        address.house ?

                        (

                        <p className="mt-3 text-black dark:text-gray-200">

                            {address.house}

                            <br/>

                            {address.street}

                            <br/>

                            {address.landmark}

                            <br/>

                            {address.area},{address.district}

                            <br/>

                            {address.state},{address.country}

                        </p>

                        )

                        :

                        (

                        <p className="text-gray-400 mt-3">

                            No address added

                        </p>

                        )

                        }



                        <button

                        onClick={()=>setShowAddressBox(true)}

                        className="bg-yellow-400 text-black font-bold px-5 py-2 rounded-full mt-5"

                        >

                            {

                            address.house

                            ?

                            "Edit Address"

                            :

                            "Add Address"

                            }

                        </button>


                    </div>
        <div className="bg-gray-300 dark:bg-gray-700 text-black  dark:text-white p-5 rounded-lg mt-5">


    <h2 className="text-xl font-bold mb-5">

        Your Products

    </h2>



    {

    cart.map((item)=>(


    <div

    key={item.cart_id}

    className="flex gap-5 border-b border-gray-500 py-5"


    >
        <img

        src={item.image_url}

        className="w-32 h-32 object-contain rounded"

        />



        <div>


            <h2 className="text-lg font-bold">

                {item.product_name}

            </h2>



            <p className="text-black dark:text-gray-300 ">

                {item.brand}

            </p>



            <p className="text-green-400 mt-2">

                In stock

            </p>



            <p className="mt-2">

                Quantity : {item.quantity}

            </p>



            <p className="font-bold mt-2">

                ₹{item.price}

            </p>


        </div>



    </div>


    ))

    }


</div>

                </div>
                



                <div className="lg:col-span-4 bg-gray-300 dark:bg-gray-700  dark:text-white p-6 rounded-lg h-fit">


                    <h2 className="text-2xl font-bold">

                        Order Summary

                    </h2>



                    <p className="mt-3">

                        Items : {cart.length}

                    </p>


                    <h2 className="text-2xl font-bold mt-3">

                        ₹{total}

                    </h2>



                    <button

                    onClick={placeOrder}

                    className="bg-yellow-400 text-black font-bold rounded-full w-full py-3 mt-6"

                    >

                        Proceed to Payment

                    </button>


                </div>


            </div>





            {

            showAddressBox &&

            (

            <div className="fixed inset-0 bg-white  dark:bg-black bg-opacity-70 flex items-center justify-center z-50">


                <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg w-96">


                    <h2 className="text-2xl font-bold mb-5">

                        {

                        address.house

                        ?

                        "Edit Address"

                        :

                        "Add Address"

                        }

                    </h2>



                    {

                    [

                    "house",

                    "street",

                    "landmark",

                    "area",

                    "district",

                    "state",

                    "country"

                    ].map((field)=>(


                    <input

                    key={field}

                    value={address[field]}

                    placeholder={field}

                    onChange={(e)=>

                    setAddress({

                    ...address,

                    [field]:e.target.value

                    })

                    }

                    className="w-full bg-white dark:bg-gray-700 p-3 rounded mb-3"

                    />


                    ))

                    }



                    <button

                    onClick={saveAddress}

                    className="bg-yellow-400 active:scale-95 text-black px-6 py-2 rounded-full font-bold"

                    >

                    Save Address

                    </button>



                    <button

                    onClick={()=>setShowAddressBox(false)}

                    className="bg-red-500  active:scale-95 px-6 py-2 rounded-full font-bold ml-3"

                    >

                    Cancel

                    </button>


                </div>


            </div>

            )

            }


        </div>

    );

};


export default Checkout;