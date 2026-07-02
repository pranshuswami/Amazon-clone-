import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuSlidersHorizontal } from "react-icons/lu";

import FilterSidebar from "../components/filters/FilterSideBar";
import ProductGrid from "../components/products/ProductGrid";

import API from "../api/axios";

const CategoryPage = () => {

    const { slug } = useParams();

    const [products, setProducts] = useState([]);

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

        <div className="flex flex-col gap-1">

        <button
            onClick={() => setShowFilter(true)}
            className="lg:hidden flex items-center justify-center border border-gray-500 rounded-full h-8 px-5 shrink-0 bg-white dark:bg-black"
        >
                <LuSlidersHorizontal className="text-lg" />
        </button>

        <button className="lg:hidden h-8 px-3 rounded-full flex items-center gap-1 text-sm shrink-0">
            <span className="text-blue-600 font-bold">✓Prime</span>
        </button>

        </div>
        

        <div className="flex flex-col gap-1">

            <div className="flex gap-1.5">
                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Most Purchased
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    View Picks
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    ⭐⭐⭐⭐⭐ & Up
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    All Discounts
                </button>

                <button className="lg:hidden h-8 px-3 border border-gray-500 rounded-full text-sm  shrink-0 bg-white dark:bg-black">
                    Today's Deal
                </button>

            </div>

            <div className="flex gap-1.5">
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

                    <h1 className="lg:block text-lg md:text-2xl font-bold mb-3 mt-0.5 ml-5 capitalize">

                        {slug.replace("-", " ")}

                    </h1>

                    <ProductGrid

                        products={products}

                    />

                </div>

            </div>

        </div>
    );
};
export default CategoryPage;