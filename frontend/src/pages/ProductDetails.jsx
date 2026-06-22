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

        <div className="flex flex-col lg:flex-row md:flex-col gap-8">

          <div className="lg:w-1/2">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-[500px] object-contain border border-gray-800 rounded-lg"
            />
          </div>

          <div className="lg:w-1/2">

            <h1 className="text-3xl font-bold">
              {product.product_name}
            </h1>

            <p className="text-gray-100 font-semibold mt-2">
              Brand: {product.brand}
            </p>

            <div className="flex items-center gap-2 mt-3">
             

              <span className="text-yellow-400 font-medium">
                Ratings: {product.rating}/5
              </span>
            </div>

            <hr className="my-4" />

            <h2 className="text-4xl font-bold text-green-500">
              {product.price} Rs    <span className="text-blue-500 text-sm hover:underline  cursor-pointer">Price history</span>
            </h2>
<br />
            
            <p className="">Save <span className="font-bold"> ₹10</span>  extra using 💎<span className="font-bold "> 100 </span>  <span className="text-blue-400 hover:underline cursor-pointer">Details</span>
                <br />
                Inclusive of all taxes
                <br/>
                EMI starts at ₹186. No Cost EMI available 
                <br />
                <span className="text-blue-400 hover:text-blue-700 hover:underline cursor-pointer">Save up to 15% with business pricing and GST input tax credit. Sign up for a free Amazon Business account</span></p>

                <span>Offers</span>
                <div className="flex flex-cols items-center justify-center gap-5">
                    <div className="border-2 w-1/2 border-white rounded-lg p-2">
                        Cashback<br />
                     Upto ₹158.00 cashback as Amazon Pay Balance when you pay with select Credit Cards<br />
                      <span className="text-blue-500 hover:underline cursor-pointer"> 4 offers</span>
                    </div>
                    <div className="border-2 w-1/2 h-35 border-white rounded-lg p-2">
                        Bank Offer<br />
                        Upto ₹2,500.00 discount on select Credit Cards, SBI Debit Cards<br />
                      <span className="text-blue-500 hover:underline cursor-pointer"> 4 offers</span>
                    </div>
                </div>

            <hr className="my-4" />

            <h3 className="font-bold text-lg mb-2">
              About this item
            </h3>

            <p className="text-gray-300 leading-7">
              {product.description}
            </p>

          </div>

          <div className="lg:w-1/4">

            <div className="border rounded-lg p-5 mt-20 shadow-md">

              <h2 className="text-3xl font-bold">
                {product.price} Rs   <span className="text-blue-500 text-xs hover:underline  cursor-pointer">Price history</span>
              </h2>

              <p className="text-green-600 mt-3 font-semibold">
                In Stock
              </p>

              <p className="text-sm text-gray-400 mt-2">
                FREE Delivery FREE delivery Monday, 22 June to <span className="text-blue-400 hover:underline cursor-pointer">Bikaner 334001</span>. Order within 5 hrs 18 mins. 
                <span className="text-blue-400 hover:underline cursor-pointer">Details</span> 
              </p>
                <p className="text-xl mt-2 text-red-400 font-semibold">{product.stock}<span> left in stock</span></p>
              <div className="mt-6 space-y-3">

                <button onClick={addToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-semibold transition"
                    >
                      Add to Cart
                </button>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
                     >
                         Buy Now
                </button>

                <p>Ships from<span> : </span>Amazon<br />
                   Sold by<span> : </span>VRP Telematics<br />
                   Gift options<span> : </span>Available at checkout<br />
                   Payment<span> : </span>Secure transaction<br /></p>

            </div>

            </div>
                <div className="border border-gray-100 rounded-lg mt-5">
                    <img  className=" rounded-xl h-30 ml-9 pt-3"src="https://i.pinimg.com/736x/a4/c5/60/a4c56048cc11e8f3e81ec8ad10a2c66f.jpg" />
                    <p className="text-xl px-5 py-1">Save up to 15% on this product with business pricing and GST input tax credit</p>

                    <button className="px-2 py-1 rounded-lg border border-gray-100 hover:border-blue-700 mx-14 mt-1 mb-3">Create a free account</button>
                </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;