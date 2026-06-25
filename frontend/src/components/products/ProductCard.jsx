import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();


    const addToCart = async (e) => {

        e.stopPropagation();

        try {

            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    product_id: product.product_id
                }
            );

            alert("Added to cart");

        }
        catch(error){

            console.log(error);

        }

    };


    


    return (

        <div
            onClick={() => navigate(`/product/${product.product_id}`)}
            className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-3"
        >

            <img
                src={product.image_url}
                className="
                w-full
                h-60
                object-contain
                rounded
                "
            />


            <p className="text-xs text-black dark:text-gray-300  mt-1">
                Sponsored ⓘ
            </p>


            <h2 className="font-bold text-lg mt-2">

                {product.product_name}

            </h2>


            <p className="text-black dark:text-gray-300 line-clamp-2">

                {product.description}

            </p>



            <div className="mt-2">

                ⭐⭐⭐⭐⭐

                <span className="ml-2">

                    {product.rating}/5

                </span>

                <span className="ml-2 text-black dark:text-gray-400">

                    ({product.reviews})

                </span>

            </div>



            <div className="mt-3">

                <span className="text-2xl font-bold">

                    ₹{product.price}

                </span>


                <span className="ml-2 text-black dark:text-gray-300 line-through">

                    ₹120000

                </span>


                <span className="text-green-400 text-sm ml-2">

                    37% off

                </span>

            </div>



            <p className="text-green-500 mt-2">

                FREE delivery tomorrow

            </p>


            <p className="text-red-400 font-semibold">

                {product.stock} left in stock

            </p>



            <button

                onClick={addToCart}

                className="bg-yellow-500 hover:bg-yellow-400 active:scale-95 w-full rounded-full py-2
                mt-4 font-bold"

            >

                Add to Cart

            </button>


        </div>

    )

}


export default ProductCard;