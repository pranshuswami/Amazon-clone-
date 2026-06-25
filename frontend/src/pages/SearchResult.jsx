import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../api/axios";
import ProductGrid from "../components/products/ProductGrid";


const SearchResult =()=>{


const {keyword}=useParams();


const [products,setProducts]=useState([]);



useEffect(()=>{


searchProducts();


},[keyword]);



const searchProducts=async()=>{


try{


const res = await API.get(
`/products/search/${keyword}`
);



setProducts(res.data.data);



}
catch(err){

console.log(err);

}


};



return(

<div className=" min-h-screen p-5">


<h1 className="text-3xl font-bold mb-5">

Search Results for "{keyword}"

</h1>



<ProductGrid

products={products}

/>



</div>


)


}


export default SearchResult;