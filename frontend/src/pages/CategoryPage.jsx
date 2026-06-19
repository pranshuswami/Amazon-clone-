import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {

  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get(
        `http://localhost:5000/products/category/${slug}`
      )
      .then((res) => {

        setProducts(res.data.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, [slug]);

  return (
    <div className="bg-black min-h-screen p-6">

      <h1 className="text-white text-3xl font-bold mb-6">
        {slug}
      </h1>

      <div className="grid grid-cols-4  gap-6">

        {products.map((product) => (

          <div
            key={product.product_id}
            className="bg-gray-900 border  border-gray-800 p-4 rounded"
             onClick={() =>
             navigate(`/product/${product.product_id}`)
  }
          >

           <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-40 rounded-lg object-cover"
            />

            <h2 className="font-bold text-gray-100 mt-3">
              {product.product_name}
            </h2>

            <p className="text-green-600 font-bold">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-300">
              {product.brand}
            </p>
          

          </div>
          

        ))}
        
      </div>
     

    </div>
  );
};

export default CategoryPage;