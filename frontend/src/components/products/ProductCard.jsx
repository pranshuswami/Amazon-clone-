import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();


    const addToCart = async (e) => {


    e.stopPropagation();


    const token = localStorage.getItem("token");


if(!token){

localStorage.setItem(

"pendingProduct",

product.product_id

);


localStorage.setItem(

"cartAction",

"cart"

);


navigate("/login");


return;

}



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


navigate("/cart");


       
    


};

    const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
);
    
    return (

        <div
            onClick={() =>{ navigate(`/product/${product.product_id}`); 
            window.scrollTo(0,0);}}
            
            className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-1.5 cursor-pointer hover:scale-101 w-full">
            
            <div className="relative ">
                <img
                src={product.image_url}
                className="w-full h-48 md:h-90 object-contain rounded"/>
                <FiHeart className="md:hidden bg-white text-3xl absolute bottom-3 right-2 rounded-xl px-1  shadow-2xl" />
                {/* <p className="absolute top-0 left-0 text-sm h-fit w-fit bg-gray-700 text-white rounded-md px-1 py-0.5">Previously Viewed</p> */}
            </div>


            <p className="text-base text-gray-500 dark:text-gray-300  mt-1">
                Sponsored ⓘ
            </p>


            <h2 className="font-bold text-base lg:text-xl mt-2">

                {product.product_name}

            </h2>


            <p className="text-black text-xs lg:text-lg md:font-medium mt-1 dark:text-gray-300 line-clamp-2">

                {product.description}

            </p>



            <div className="mt-2 flex items-center">

                <span className="hidden md:block text-base lg:text-sm mr-1">

                    {product.rating}

                </span>
                <span className="text-sm lg:text-lg flex items-center"><FaStar className="text-yellow-600 " />
                                        <FaStar className="text-yellow-600" />
                                        <FaStar className="text-yellow-600" />
                                        <FaStar className="text-yellow-600" />
                                        <FaRegStar className="text-yellow-600 mr-1" /><span className="hidden md:block">⌵</span></span>

                <span className="md:hidden text-xs lg:text-sm">

                    {product.rating}<span className="hidden lg:inline">/5</span>

                </span>

                <span className="ml-1 text-xs lg:text-sm text-black dark:text-gray-400">

                    ({product.reviews})

                </span>

            </div>



            <div className="mt-3">

                <span className="text-xl font-medium md:text-3xl lg:font-bold">

                    ₹{product.price}

                </span>


                <span className="ml-2 text-gray-500 dark:text-gray-300 text-xs lg:text-sm ">
                    <span className="hidden md:block md:inline">M.R.P:</span>
                    <span className="line-through">₹{product.mrp}</span>

                </span>


                <span className="font-medium text-sm ml-2">

                    ({discount}% OFF)

                </span>

            </div>

            <p className=" hidden md:block text-gray-500">Up to 5% back with Amazon Pay ICICI c...</p>

            <p className="text-sm md:text-base font-medium mt-2">

                FREE delivery tomorrow

            </p>


            <button

                onClick={addToCart}

                className="bg-amber-300 hover:bg-yellow-400 active:scale-95 w-full rounded-full py-2
                mt-4"

            >

                Add to Cart

            </button>


        </div>

    )

}


export default ProductCard;