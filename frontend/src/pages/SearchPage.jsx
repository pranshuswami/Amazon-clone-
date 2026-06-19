import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SearchPage = () => {

  const { keyword } = useParams();

  const [products, setProducts] = useState([]);

const navigate = useNavigate();

  useEffect(() => {

    axios
      .get(`http://localhost:5000/products/search/${keyword}`)
      .then((res) => {

        console.log(res.data);

        setProducts(res.data.data);

      })
      .catch((err) => {

        console.log(err);

      });


  }, [keyword]);



  return (

    <div className="bg-black text-white min-h-screen p-6">


      <h1 className="text-3xl font-bold mb-6">

        Search Result : {keyword}

      </h1>



      <div className="grid grid-cols-3 gap-6">


        {
          products.map((product)=>(


            <div
              key={product.product_id}
              className="bg-gray-900 p-4 rounded shadow"
              onClick={()=>navigate(`/product/${product.product_id}`)}
            >


              <img
                src={product.image_url}
                alt={product.product_name}
                className="h-48 w-full object-cover"
              />


              <h2 className="font-bold mt-3">

                {product.product_name}

              </h2>


              <p className="text-green-600 font-bold">

                {product.price} Rs

              </p>


            </div>


          ))
        }


      </div>


    </div>

  );

};


export default SearchPage;