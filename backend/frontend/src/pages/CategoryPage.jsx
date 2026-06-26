import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FilterSidebar from "../components/filters/FilterSideBar";
import ProductGrid from "../components/products/ProductGrid";

import API from "../api/axios";


const CategoryPage = () => {


const { slug } = useParams();



const [products,setProducts] = useState([]);

const [brands,setBrands] = useState([]);



const [filters,setFilters] = useState({

brand:[],

minPrice:"",

maxPrice:""

});

useEffect(()=>{


getProducts();


},[slug,filters]);

const getProducts = async()=>{


try{


const res = await API.get(

`/products/category/${slug}`,

{

params:{
brand:filters.brand.join(","),
minPrice:filters.minPrice,
maxPrice:filters.maxPrice
}

}

);




console.log(res.data);




setProducts(res.data.data);



setBrands(res.data.brands || []);




}
catch(error){
console.log(error);
}
};
return (
<div className="bg-gray-100 dark:bg-black text-black dark:text-white min-h-screen">
<div className="grid grid-cols-12 gap-5">
<div className="col-span-3 mt-6 ml-3">
<FilterSidebar
filters={filters}
setFilters={setFilters}
brands={brands}
/>
</div>
<div className="col-span-9 mr-3 ">
<h1 className="text-3xl font-bold mb-5 capitalize">
{slug.replace("-"," ")}
</h1>
<ProductGrid

products={products}

/>
</div>
</div>
</div>
)

}



export default CategoryPage;