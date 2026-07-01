import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";



const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [showReviewBox, setShowReviewBox] = useState(false);
    const [showWishlistBox, setShowWishlistBox] = useState(false);
    const navigate=useNavigate()


    useEffect(() => {

        getProduct();
        getReviews();

    }, []);



    const getProduct = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/products/${id}`
            );

            setProduct(res.data.data);

        }
        catch(error) {

            console.log(error);

        }

    };



    const getReviews = async () => {
            
        try {

            const res = await axios.get(
                `http://localhost:5000/reviews/${id}`
            );

            setReviews(res.data.data);

        }
        catch(error) {

            console.log(error);

        }

    };

    const handleLoginRedirect = (action)=>{

        localStorage.setItem(
            "pendingProduct",
            product.product_id
        );

        localStorage.setItem(
            "cartAction",
            action
        );

    navigate("/login");

};
//     const addWishlist = async()=>{


//     const token = localStorage.getItem("token");


//     if(!token){

//         navigate("/login");

//         return;

//     }


//     try{


//         await axios.post(

//             "http://localhost:5000/wishlist/add",

//             {

//                 product_id:product.product_id

//             },

//             {

//                 headers:{

//                     Authorization:

//                     `Bearer ${token}`

//                 }

//             }

//         );


//         setShowWishlistBox(true);


//     }


//     catch(error){

//         console.log(error);

//     }


// };
    const addToCart = async () => {

    const token = localStorage.getItem("token");


    if(!token){

        handleLoginRedirect("cart");

        return;

    }


    try{

        await axios.post(

        "http://localhost:5000/cart/add",

        {
            product_id:product.product_id,
            quantity:1
        }

        );


        navigate("/cart");


    }
    catch(error){

        console.log(error);

    }

};
    const buyNow = async()=>{

    const token = localStorage.getItem("token");

        if(!token){

            handleLoginRedirect("checkout");

            return;

        }


        try{


            await axios.post(

            "http://localhost:5000/cart/add",

                {
                product_id:product.product_id,
                quantity:1
                },

                {

                headers:{

                Authorization:

                `Bearer ${token}`

                }

                }

                );


                navigate("/checkout");


        }

        catch(error){

            console.log(error);

        }


    };
    
    const addReview = async () => {
        const token = localStorage.getItem("token");
          if(!token){

    navigate("/login");

    return;

}

        if( comment === "") {

            alert("Please give review");
            return;

        }


        try {

            await axios.post(
                "http://localhost:5000/reviews/add",
                {
                    product_id:id,
                    rating,
                    comment
                }
            );


            setRating(0);
            setComment("");

            getReviews();
            setShowReviewBox(false);

        }
        catch(error) {

            console.log(error);

        }

    };
    

    if(!product) {

        return <h1>Loading...</h1>;

    }

    return (

        <div className="min-h-screen p-3 md:p-6">

            <div className="flex flex-col md:flex-row">
                
                <div className="bg-gray-200 dark:bg-gray-800 w-full lg:w-1/3 p-6 ">
                
                <img 
                    src={product.image_url}
                    className="w-full h-[400px] md:h-[500px] object-contain md:sticky md:top-20"
                />
                
                
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 w-full lg:w-1/2 p-6">
            
                <h1 className="text-3xl font-bold mt-5">
                    {product.product_name}
                </h1>
                <p className=" text-blue-00 mt-1.5 font-medium">Brand: {product.brand}</p>

                

                <h2 className="text-2xl font-bold mt-3">
                    ₹{product.price}
                </h2>
                <p className="mt-2 text-lg">Save <span className="font-bold">₹10</span> extra using <span className="font-bold">💎100</span> <span className="text-blue-500 hover:underline cursor-pointer">Details</span></p>
                <p className=" mt-2 text-lg ">Inclusive of all taxes
                    <br />
                <span className="text-blue-500 hover:underline cursor-pointer">Save up to 18% with business pricing and GST input tax credit. Sign up for a free Amazon Business account</span>
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center w-full mt-3 gap-3">
                <div className="border border-gray-400 dark:border-gray-100 rounded-lg px-3 py-2 w-full md:w-1/2"><span className="font-bold">Cashback</span>
                    <br />

            Upto ₹50.00 cashback as Amazon Pay Balance when you pay with select Credit CardsUpto ₹50.00 cashback as Amazon Pay Balance when…<br />
                <span className="text-blue-500 hover:underline cursor-pointer">3 offers</span>
                </div>
                <div className="border h-auto md:h-38 border-gray-400 dark:border-gray-100 rounded-lg px-3 py-2 w-full md:w-1/2"><span className="font-bold">Bank Offers</span>
                    <br />

            10% Instant Discount up to INR 1000 on ICICI Bank Credit Card (excluding Amazon Pay ICICI Credit Card) EMI Trxns. Min purchase value INR 7490<br />
                <span className="text-blue-500 hover:underline cursor-pointer">16 offers</span>
                </div>

                
            </div>
            <hr className="mt-5 border-gray-300 dark:border-gray-600"></hr>
            <h2 className="font-bold text-2xl mt-3">About this item</h2>
            <p className="mt-3 text-lg text-black dark:text-gray-300">
                    {product.description}
                </p>

            
            </div>

            
            <div className="bg-gray-200 dark:bg-gray-800 w-full lg:w-1/4 px-6 py-10 ">
            
                <div className=" border mt-5 border-gray-400 dark:border-gray-100 p-6 mb-5 flex-row items-center justify-center
                rounded-lg">
                    <h2 className="text-2xl font-bold ">
                    ₹{product.price}
                </h2>
                <p className="">FREE delivery tomorrow June to <span className="text-blue-500 hover:underline cursor-pointer">Bikaner 334001</span>. Order within 10 hrs 31 mins. <span className="text-blue-500 hover:underline cursor-pointer">Details</span></p>
                <p className="text-red-400 font-bold">{product.stock} left in stock</p>

                <button onClick={addToCart}
                    className="bg-yellow-300 mt-3 h-9 text-black font-bold active:scale-95 hover:bg-yellow-500 px-2 py-1 rounded-full w-full">
                   Add to Cart
                </button>

                <button onClick={buyNow}
                className="bg-orange-400 mt-3 h-9 text-black font-bold active:scale-95 hover:bg-yellow-600 px-2 py-1 rounded-full w-full">Buy Now</button>

                {/* <button onClick={addWishlist}
                className="border border-gray-400 mt-3 h-9 font-bold px-2 py-1 rounded-full w-full hover:bg-gray-300 dark:hover:bg-gray-700">❤️ Add to Wishlist</button> */}

                </div>
                <div className="border border-gray-400 dark:border-gray-100 p-2  flex-row items-center justify-center
                rounded-lg">
                    <img className="rounded-lg object-cover" src="https://i.pinimg.com/736x/ed/1e/3e/ed1e3e53ec7837cb55d7167bec051f0b.jpg"/>
                    <p className="mt-2 font-medium">Save up to 18% on this product with business pricing and GST input tax credit</p>
                    <button className="border dark:border-gray-100 hover:border-blue-500  rounded-lg px-2 py-1  mt-2 mx-15">
                        Create a free account
                    </button>
                </div>
            </div>


            </div>
            
                <div className="mt-8 mx-4 lg:mx-20 flex flex-col items-center justify-center h-35 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className=" text-center text-2xl font-semibold">Write a review</h2>
                 <button

                    onClick={()=>setShowReviewBox(true)}

                    className="bg-yellow-400 mt-3 active:scale-95 text-black font-bold px-8 py-3 rounded-full"

                >

                        Write a Review

                </button>

           

            </div>



            <div className="mt-8 w-full">

                <h2 className="text-2xl font-bold mb-5">
                    Customer Reviews
                </h2>


                {
                    reviews.map((review,index)=>(

                        <div
                            key={review.review_id}
                            className="bg-gray-200 dark:bg-gray-800 p-5 rounded mb-4"
                        >
                             <p className="mt-3">
                                {index + 1}
                            </p>

                        
                            <p className="mt-3">
                                {review.comment}
                            </p>

                        </div>

                    ))
                }


            </div>

            {
                showReviewBox && (

                <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-70 flex items-center justify-center z-50">


                    <div className="bg-gray-200 dark:bg-gray-800 mt-5 p-6 rounded-lg w-180 h-120">


                        <h2 className="text-2xl text-center font-bold mb-5">

                            Write your review

                        </h2>



                        <textarea

                            value={comment}

                            onChange={(e)=>setComment(e.target.value)}

                            placeholder="Write your review..."

                            className="w-full   bg-white dark:bg-gray-700 p-3 rounded h-76"

                        />



                    <div className="  flex items-center justify-center gap-5 mt-5">


                        <button

                            onClick={addReview}

                            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full"

                        >

                            Submit

                        </button>



                        <button

                            onClick={()=>setShowReviewBox(false)}

                            className="bg-red-500 px-6 py-2 rounded-full font-bold"

                        >

                                Cancel

                        </button>


                    </div>


                </div>


            </div>

        )
    }
        
            

        </div>

    );

};


export default ProductDetails;