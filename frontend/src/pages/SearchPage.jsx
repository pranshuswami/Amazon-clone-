import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import FilterSidebar from "../components/filters/FilterSideBar";
import ProductGrid from "../components/products/ProductGrid";


const SearchPage = () => {

  const { keyword } = useParams();

  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);

  const [filters, setFilters] = useState({
    brand: [],
    minPrice: "",
    maxPrice: ""
  });


  useEffect(() => {

    getProducts();

  }, [keyword, filters]);


  const getProducts = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/products/search/${keyword}`,
        {
          params: {
            brand: filters.brand.join(","),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice
          }
        }
      );


      console.log(res.data);


      setProducts(res.data.data);


      const allBrands = [
        ...new Set(
          res.data.data.map(item => item.brand)
        )
      ];


      setBrands(allBrands);


    } catch (err) {

      console.log(err);

    }

  };


  return (

    <div className="bg-black text-white min-h-screen p-6">
              <h1 className="text-3xl font-bold mb-6">
                Search Result : {keyword}
      </h1>


      <div className="grid grid-cols-12 gap-5">


        <div className="col-span-12 md:col-span-3">

          <FilterSidebar

            filters={filters}

            setFilters={setFilters}

            brands={brands}

          />

        </div>


        <div className="col-span-12 md:col-span-9">

          <ProductGrid

            products={products}

          />

        </div>


      </div>

    </div>

  );

};


export default SearchPage;