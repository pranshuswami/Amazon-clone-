import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import logo from "../assets/Heart and share logo.png"


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
        },
        {
            headers:{

                Authorization:

                `Bearer ${token}`

            }

        }

        );

        alert("Product added to cart")
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

        <div className="min-h-screen p-0.5 md:p-6">

            <div className="flex flex-col md:flex-row">
                <div className="bg-gray-100 md:hidden rounded-lg flex items-center m-1">

                    <img className="p-2 w-16 h-16 object-contain"
                    src="https://i.pinimg.com/736x/cb/44/0b/cb440bf81ad4dbb9a3b2ddaf04751f39.jpg" />

                    <div className="ml-2">
                       
                    <h2 className="inline text-sm font-bold">
                            Samsung S26 Ultra
                    </h2>

                    <span className="text-sm pl-1 font-medium">
                           Samsung Galaxy S26 Ultra 5G...
                    </span>
                       
                       <div className="flex items-center justify-between mb-3">
                         <h2>₹1,39,000
                        <span className="text-blue-600 font-semibold text-xs ml-1.5">
                        <snap className="text-orange-400 items-end">✓</snap>prime
                        </span>
                        </h2>
                        <h2 className="lg:hidden text-xs font-medium text-black text-right -mr-3 ">Sponsored ⓘ</h2>
                       </div>
                    </div>
                </div>
                
                <div className="bg-white lg:bg-gray-200 dark:bg-gray-800 w-full lg:w-1/3 p-1 lg:p-6">
                <h2 className="md:hidden -mt-1 text-[14px] ml-2 text-cyan-600 flex items-center justify-between">Brand: {product.brand}
                <span className="flex items-center">  
                        <FaStar className="text-yellow-600 ml-2 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaRegStar className="text-yellow-600 text-sm mr-1" />
                        <span className="text-black text-sm">1224</span>
                        </span></h2>
                <h2 className="md:hidden text-sm ml-2 text-gray-500 line-clamp-2 leading-tight">{product.description}</h2>

                <h2 className=" md:hidden text-[14px] font-bold ml-2 mt-2 mb-1"> 400+ bought<span className=" text-sm font-normal"> in past month</span></h2>
                <img 
                    src={product.image_url}
                    className="w-full h-[515px] md:h-[450px] object-cover md:sticky md:top-20"
                />
                <div className="md:hidden flex items-center justify-between">
                    <h2 className="text-center text-base ml-43 my-3">● <span className="text-gray-400"> ● ● ● </span><span className="text-xs text-gray-400"> ●</span></h2>
                <img className="h-9 w-20 object-contain"
                src={logo} />
                </div>
                
            </div>
            <div className="bg-white md:bg-gray-200 dark:bg-gray-800 w-full lg:w-1/2 p-2 md:p-6 mt-1">
            <h2 className="md:hidden text-base mb-2">Colour:<span className="font-bold"> White</span></h2>

            <div className=" md:hidden flex gap-2 border-b border-gray-300 pb-7">
                <div className="border-3 border-blue-900 rounded-2xl w-[90.83px] h-[180px]">
                    <img className="rounded-t-2xl object-cover border-b border-gray-300"
                    src="https://i.pinimg.com/1200x/2c/72/b1/2c72b1c676062281b5b013da3f6f58f0.jpg" />
                    <h2 className="font-bold text-base pl-2">White</h2>
                    <h2 className="text-sm pl-2">₹{product.price}</h2>
                    <h2 className="text-gray-500 text-sm pl-2 line-through">₹89,000</h2>
                </div>

                <div className="border border-gray-300 rounded-2xl w-[90.83px] h-[183px]">
                    <img className="rounded-t-2xl object-cover border-b border-gray-300 pb-1.5"
                    src="https://i.pinimg.com/736x/2b/4e/2d/2b4e2d1821f4b3f50dcf94430bbc3c0d.jpg" />
                    <h2 className="font-bold text-base pl-2 ">Black</h2>
                    <h2 className="text-sm pl-2">₹{product.price}</h2>
                    <h2 className="text-gray-500 text-sm pl-2 line-through">₹89,000</h2>
                </div>

                <div className="border border-gray-300 rounded-2xl w-[90.83px] h-[183px]">
                    <img className="rounded-t-2xl object-cover border-b border-gray-300"
                    src="https://i.pinimg.com/736x/7e/f6/02/7ef602c6b66304adc65fdfc3afa8cb15.jpg" />
                    <h2 className="font-bold text-base pl-2">Pink</h2>
                    <h2 className="text-sm pl-2">₹{product.price}</h2>
                    <h2 className="text-gray-500 text-sm pl-2 line-through">₹89,000</h2>
                </div>

                <div className="border border-gray-300 rounded-2xl w-[90.83px] h-[183px]">
                    <img className="rounded-t-2xl object-cover border-b border-gray-300"
                    src="https://i.pinimg.com/1200x/9b/b2/ec/9bb2ec7b0ba9bdffb8a94326146ca43d.jpg" />
                    <h2 className="font-bold text-base pl-2">Yellow</h2>
                    <h2 className="text-sm pl-2">₹{product.price}</h2>
                    <h2 className="text-gray-500 text-sm pl-2 line-through">₹89,000</h2>
                </div>
            </div>
            
                <h1 className=" hidden md:blocktext-3xl font-bold mt-2 lg:mt-5">
                    {product.product_name}
                </h1>
                <p className="hidden md:block text-blue-00 mt-1.5 font-medium">Brand: {product.brand}</p>

                

                <h2 className="text-2xl font-bold mt-3">
                    <span className="text-red-600 font-normal">-11%</span> ₹{product.price}
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

            
            <div className="bg-gray-200 dark:bg-gray-800 w-full lg:w-1/4 px-6 py-7 ">
            
                <div className=" border mt-1 lg:mt-5 border-gray-400 dark:border-gray-100 p-6 mb-5 flex-row items-center justify-center
                rounded-lg">
                    <h2 className="text-2xl font-bold ">
                    ₹{product.price}
                </h2>
                <p className="mt-2 text-lg lg:hidden">Save <span className="font-bold">₹10</span> extra using <span className="font-bold">💎100</span> <span className="text-blue-500 hover:underline cursor-pointer">Details</span></p>

                <p className="mt-2">FREE delivery tomorrow June to <span className="text-blue-500 hover:underline cursor-pointer">Bikaner 334001</span>. Order within 10 hrs 31 mins. <span className="text-blue-500 hover:underline cursor-pointer">Details</span></p>

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