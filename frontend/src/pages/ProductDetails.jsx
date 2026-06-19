import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const navigate =useNavigate()
  const addToCart = ()=>{


axios.post(
"http://localhost:5000/cart/add",
{
product_id:product.product_id
}

)
.then(()=>{

navigate("/cart");

})


}
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">

      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-1/3">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-[500px] object-contain border border-gray-800 rounded-lg"
            />
          </div>

          <div className="lg:w-1/3">

            <h1 className="text-3xl font-bold">
              {product.product_name}
            </h1>

            <p className="text-gray-100 font-semibold mt-2">
              Brand: {product.brand}
            </p>

            <div className="flex items-center gap-2 mt-3">
             

              <span className="text-yellow-400 font-medium">
                Ratings:{product.rating}/5
              </span>
            </div>

            <hr className="my-4" />

            <h2 className="text-4xl font-bold text-green-500">
              {product.price} Rs
            </h2>

            <p className="text-green-600 mt-2 font-medium">
              Inclusive of all taxes
            </p>

            <hr className="my-4" />

            <h3 className="font-bold text-lg mb-2">
              About this item
            </h3>

            <p className="text-gray-300 leading-7">
              {product.description}
            </p>

          </div>

          <div className="lg:w-1/3">

            <div className="border rounded-lg p-5 mt-25 shadow-md">

              <h2 className="text-3xl font-bold">
                {product.price} Rs
              </h2>

              <p className="text-green-600 mt-3 font-semibold">
                In Stock
              </p>

              <p className="text-sm text-gray-400 mt-2">
                FREE Delivery Available
              </p>

              <div className="mt-6 space-y-3">

                <button onClick={addToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-semibold transition"
                    >
                      Add to Cart
                </button>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
                     >
                         Buy Now
                </button>

            </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;