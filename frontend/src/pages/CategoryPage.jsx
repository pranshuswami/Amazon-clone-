import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuSlidersHorizontal } from "react-icons/lu";
import filter from "../assets/filter.png"

import FilterSidebar from "../components/filters/FilterSideBar";
import ProductGrid from "../components/products/ProductGrid";

import { FaRegStar, FaStar } from "react-icons/fa"
import { PiSlidersHorizontal } from "react-icons/pi";


import API from "../api/axios";

import React from 'react'

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

        <div className="relative bg-white dark:bg-black text-black dark:text-white min-h-screen md:p-2
        ">
        
        <div className="hidden md:flex items-center justify-between bg-white px-3 py-0.5 border-b border-gray-300 -ml-2.5 ">
            <h2 className="text-lg">1-48 of over 30,000 results for<span className="text-orange-600 font-bold"> "mobiles"</span></h2>
            <button className="px-5 py-0.75 mb-1.5 border border-black font-medium rounded-xl text-base">Sort by: Features ⌵</button>
        </div>


        <div className="bg-white w-full dark:bg-black shadow-sm dark:shadow-white ">

    <div className="lg:hidden flex items-center gap-1 px-1 py-2 overflow-x-auto scrollbar-hide">

        <div className="flex flex-col gap-3.5">

        <button
            onClick={() => setShowFilter(true)}
            className="lg:hidden flex items-center justify-center border border-gray-500 rounded-full h-8 shrink-0 bg-white dark:bg-black mx-1"
        >
                <PiSlidersHorizontal className=" hidden text-xl font-bold" />
                <img className="w-7 object-contain"
                src={filter} />
        </button>

        <div className="flex items-center gap-2 ml-1.5">

    <span className="text-blue-600 font-semibold text-xs">
        <snap className="text-orange-400 items-end">✓</snap>prime
    </span>

    <button
        onClick={() => setPrime(!prime)}
        className=" bg-white relative w-9 h-5 rounded-full border border-cyan-700 transition-all duration-300"
    >

        <span
            className={`absolute top-[1.5px] bottom-[1.5px] w-4 h-4 bg-cyan-700 text-white text-xl rounded-full shadow-md transition-all duration-300 ${
                prime ? "right-[1px]" : "left-[1px]"
            }`}
        ><span className="absolute -bottom-1 right-1">-</span></span>

    </button>

</div>

        </div>
        <div className="w-px h-[68px] bg-gray-200  shrink-0"></div>

        <div className="flex flex-col gap-1">

            <div className="flex gap-1.5">
                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black ">
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
                 
            
                <div className="lg:col-span-3 mt-1 lg:mt-2.5">

                   

                    <div className="hidden lg:block w-74">

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
                    
                    <h1 className="hidden text-lg md:text-2xl font-bold mb-1 mt-0.5 md:ml-0 ml-5 capitalize">

                        {slug.replace("-", " ")}<br />
                    {/* <span className="text-xs font-normal text-gray-400">Sponsered</span> */}
                    </h1>
                    <div className="w-[430px] h-[430px] flex flex-col md:hidden">
                    <img className="-mt-2 mx-auto h-64 w-full object-contain"
                    src="https://i.pinimg.com/736x/29/e0/46/29e046b82a2f59dd3ccb2fcc53e682f4.jpg" />

                    
                   <div className="flex">
                    <img className="pl-4 my-1 w-32 h-45 object-contain"
                    src="https://i.pinimg.com/736x/cb/44/0b/cb440bf81ad4dbb9a3b2ddaf04751f39.jpg" />
                    
                    

                    <div className="pl-6 px-2 py-1">
                        <h2 className="text-sm line-clamp-3 leading-5">Samsung Galaxy S26 Ultra 5G (Black, 12GB RAM, 256GB Storage) with Built-in Privacy Display, AI Phone, Photo Assist, Creative Studio, 200MP Camera, 5000mAh Battery and Snapdragon 8 Elite Gen 5</h2>
                        
                        <h2 className="text-sm mt-2 flex items-center">4.0<FaStar className="text-yellow-600 ml-2 text-xs" />
                        <FaStar className="text-yellow-600 text-xs" /><FaStar className="text-yellow-600 text-xs" /><FaStar className="text-yellow-600 text-xs" /><FaRegStar className="text-yellow-600 mr-2 text-xs" /><span className="text-gray-500 dark:text-gray-200">1,224</span></h2>
                        
                        <h2 className="bg-[#CC0C39] rounded-md text-[13px] mt-1.5 w-fit text-white font-semibold px-1.25 py-1 leading-tight">Limited time deal</h2>

                        <h2><span className="text-[#CC0C39]">-12%</span>{" "}<span className="text-xl font-medium">₹1,39,000</span></h2>

                        <h2 className="line-through text-sm text-gray-600 mt-1.5">M.R.P:-1,49,000</h2>
                    </div>

                    </div>

                    </div>
                    <h2 className="lg:hidden text-xs font-medium text-gray-500 text-right mr-1 ">Sponsored ⓘ</h2>

                    {/* <h2 className="lg:hidden ml-2 mt-4 text-base">Showing products near you, with fast delivery</h2>
                    <h2 className="lg:hidden ml-2 mt-1 text-xs underline">See all Products, along price range</h2> */}
                    <div className="lg:hidden bg-white p-2  dark:bg-black shadow-xl mt-4 ">
                        <h2 className=" text-gray-600 dark:text-gray-100 text-xs mt-3.5 -mb-1">Check Each product page for other buying options</h2>
                    </div>

                    <div className="hidden md:block mt-3">
                        <h2 className="text-2xl">
                            Showing products near you, with fast delivery
                        </h2>
                        <h2 className="text-lg text-blue-800">See all products, across price ranges.</h2>
                        <h2 className="mt-5 text-2xl font-bold">Results</h2>
                        <h2 className="text-gray-700 text-lg">Check each product page for other buying options.</h2>
                    </div>
                    

                    <ProductGrid
                    
                        products={products}

                    />
                    

                </div>
                

            </div>
            

        </div>
    );
};
export default CategoryPage