import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuSlidersHorizontal } from "react-icons/lu";

import FilterSidebar from "../components/filters/FilterSideBar";
import ProductGrid from "../components/products/ProductGrid";

import { FaRegStar, FaStar } from "react-icons/fa"
import { PiSlidersHorizontal } from "react-icons/pi";


import API from "../api/axios";

const CategoryPage = () => {

    const { slug } = useParams();

    const [products, setProducts] = useState([]);

    const [prime,setPrime] = useState(true);

    const [showFilter, setShowFilter] = useState(false)

    const [brands, setBrands] = useState([]);

    const [filters, setFilters] = useState({

        brand: [],

        minPrice: "",

        maxPrice: ""

    });

    useEffect(() => {

        getProducts();

    }, [slug, filters]);

    const getProducts = async () => {

        try {

            const res = await API.get(

                `/products/category/${slug}`,

                {

                    params: {

                        brand: filters.brand.join(","),

                        minPrice: filters.minPrice,

                        maxPrice: filters.maxPrice

                    }

                }

            )

            console.log(res.data);

            setProducts(res.data.data);

            setBrands(res.data.brands || []);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="bg-gray-100 dark:bg-black text-black dark:text-white min-h-screen md:p-5">

        <div className="bg-white w-full dark:bg-black shadow-sm dark:shadow-white ">

    <div className="flex items-center gap-2.5 px-1 py-2 overflow-x-auto scrollbar-hide">

        <div className="flex flex-col gap-3">

        <button
            onClick={() => setShowFilter(true)}
            className="lg:hidden flex items-center justify-center border border-gray-500 rounded-full h-8 px-5 shrink-0 bg-white dark:bg-black"
        >
                <PiSlidersHorizontal className="text-xl font-bold" />
        </button>

        <div className="flex items-center gap-2 ml-1.5">

    <span className="text-blue-600 font-semibold text-xs">
        <snap className="text-orange-400 items-end">✓</snap>prime
    </span>

    <button
        onClick={() => setPrime(!prime)}
        className={`relative w-9 h-5 rounded-full border border-cyan-700 transition-all duration-300 ${
            prime ? "bg-white" : "bg-white"
        }`}
    >

        <span
            className={`absolute top-[1.5px] bottom-[1.5px] w-4 h-4 bg-cyan-700 text-white text-xl rounded-full shadow-md transition-all duration-300 ${
                prime ? "right-[2px]" : "left-[2px]"
            }`}
        ><span className="absolute -bottom-1 right-1">-</span></span>

    </button>

</div>

        </div>
        

        <div className="flex flex-col gap-1">

            <div className="flex gap-1.5">
                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Most Purchased
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    View Picks
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black flex items-center">
                    <FaStar className="text-yellow-600 text-base mr-0.5 " />
                        <FaStar className="text-yellow-600 text-base mr-0.5" /><FaStar className="text-yellow-600 text-base mr-0.5" /><FaStar className="text-yellow-600 mr-2 text-base" /> & Up
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    All Discounts
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Today's Deal
                </button>

            </div>

            <div className="flex items-center gap-1.5">
                <button className="lg:hidden w-fit h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Popular
                </button>

                <button className="lg:hidden  w-fit h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Brands
                </button>

                <button className="lg:hidden  w-fit h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Display
                </button>

                <button className="lg:hidden  w-fit h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Amazon Fashion
                </button>

                <button className="lg:hidden  w-fit h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Band material
                </button>

                <button className="lg:hidden  w-fit h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Band Color
                </button>
            </div>
                

            </div>

    </div>

</div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-5">
                 

                <div className="lg:col-span-3 mt-1 lg:mt-6">

                   

                    <div className="hidden lg:block">

                        <FilterSidebar

                        filters={filters}

                        setFilters={setFilters}

                        brands={brands}

                    />
                    </div>

                {
                    showFilter && (
                        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">

                            <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 p-5 overflow-y-auto">

                                <div className="flex justify-between items-center mb-5">

                                    <h2 className="text-xl font-bold">Filters</h2>

                                    <button onClick={()=>setShowFilter(false)}
                                    className="text-xl font-bold">✕</button>

                                </div>
                            <FilterSidebar

                                filters={filters}

                                setFilters={setFilters}

                                brands={brands}

                            />
                            </div>

                        </div>
                    )
                }

                </div>

                <div className="lg:col-span-9">

                    <h1 className="hidden lg:block text-lg md:text-2xl font-bold mb-1 mt-0.5 ml-5 capitalize">

                        {slug.replace("-", " ")}<br />
                    {/* <span className="text-xs font-normal text-gray-400">Sponsered</span> */}
                    </h1>
                    <div className="w-[430px] h-[430px] flex flex-col">
                    <img className="-mt-2 mx-auto h-64 w-full object-contain"
                    src="https://i.pinimg.com/736x/29/e0/46/29e046b82a2f59dd3ccb2fcc53e682f4.jpg" />

                    
                   <div className="flex">
                    <img className="pl-4my-1 w-32 h-45 object-contain"
                    src="https://i.pinimg.com/736x/cb/44/0b/cb440bf81ad4dbb9a3b2ddaf04751f39.jpg" />
                    
                    

                    <div className="pl-6 px-2 py-1">
                        <h2 className="text-sm line-clamp-3 leading-5">Samsung Galaxy S26 Ultra 5G (Black, 12GB RAM, 256GB Storage) with Built-in Privacy Display, AI Phone, Photo Assist, Creative Studio, 200MP Camera, 5000mAh Battery and Snapdragon 8 Elite Gen 5</h2>
                        
                        <h2 className="text-sm mt-2 flex items-center ">4.0<FaStar className="text-yellow-600 ml-2 text-xs" />
                        <FaStar className="text-yellow-600 text-xs" /><FaStar className="text-yellow-600 text-xs" /><FaStar className="text-yellow-600 text-xs" /><FaRegStar className="text-yellow-600 mr-2 text-xs" /><span className="text-gray-500 dark:text-gray-200">1224</span></h2>
                        
                        <h2 className="bg-[#CC0C39] rounded-md text-sm mt-1.5 w-fit text-white font-semibold px-1.25 py-1 leading-tight">Limited time deal</h2>

                        <h2><span className="text-red-500">-12%</span>{" "}<span className="text-xl font-medium">₹1,29,000</span></h2>

                        <h2 className="line-through text-sm text-gray-600 mt-2">M.R.P:-1,49,000</h2>
                    </div>

                    </div>

                    </div>
                    <h2 className="text-xs font-medium text-gray-500 text-right mr-1">Sponsored ⓘ</h2>

                    <h2 className="ml-2 mt-2 text-base">Showing products near you with fast delivery</h2>
                    <h2 className="ml-2 mt-1 text-xs underline">See all Products, along price range</h2>
                    <div className="bg-white p-2 mt-3 dark:bg-black">
                        <h2 className=" text-gray-600 dark:text-gray-100 text-xs mt-3">Check Each product page for other buying options</h2>
                    </div>

                    <ProductGrid

                        products={products}

                    />

                </div>

            </div>

        </div>
    );
};
export default CategoryPage;