const FilterSidebar = ({
filters,
setFilters,
brands
}) => {


const selectBrand = (brand)=>{

let updatedBrands;


if(filters.brand.includes(brand)){

updatedBrands = filters.brand.filter(
(item)=>item !== brand
);

}
else{

updatedBrands = [
...filters.brand,
brand
];

}


setFilters({

...filters,

brand:updatedBrands

});

};



const priceFilter = (min,max)=>{


setFilters({

...filters,

minPrice:min,
maxPrice:max

});


};



return (

<div className="bg-gray-900 text-white p-5 rounded-lg">


<h2 className="font-bold text-xl mb-4">
Brand
</h2>


{
brands.map((brand)=>(

<label 
key={brand}
className="block mb-3 cursor-pointer"
>


<input

type="checkbox"

checked={
filters.brand.includes(brand)
}

onChange={()=>selectBrand(brand)}

/>


<span className="ml-2">
{brand}
</span>


</label>

))

}



<hr className="my-5"/>


<h2 className="font-bold text-xl mb-4">
Price
</h2>



<label className="block mb-3 cursor-pointer">


<input

type="radio"

name="price"

onChange={()=>priceFilter(0,10000)}

/>


<span className="ml-2">
Under ₹10000
</span>


</label>




<label className="block mb-3 cursor-pointer">


<input

type="radio"

name="price"

onChange={()=>priceFilter(10000,50000)}

/>


<span className="ml-2">
₹10000 - ₹50000
</span>


</label>





<label className="block mb-3 cursor-pointer">


<input

type="radio"

name="price"

onChange={()=>priceFilter(50000,"")}

/>


<span className="ml-2">
Above ₹50000
</span>


</label>



<label className="block mb-3 cursor-pointer">


<input

type="radio"

name="price"

onChange={()=>setFilters({

...filters,

minPrice:"",
maxPrice:""

})}

/>


<span className="ml-2">
Clear Price Filter
</span>


</label>



</div>

)

}


export default FilterSidebar;