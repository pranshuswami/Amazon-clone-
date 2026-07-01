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

        <div className="bg-gray-100 dark:bg-black text-black dark:text-white min-h-screen p-3 md:p-5">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-5">

                <div className="lg:col-span-3 mt-1 lg:mt-6">

                    <button 
                    onClick={()=>setShowFilter(true)}
                    className="lg:hidden border rounded-full px-5 py-1 text-black dark:text-white dark:border-white font-bold ">
                        
                        <LuSlidersHorizontal className="text-2xl"/>

                    </button>

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

                    <h1 className="text-xl md:text-2xl font-bold mb-3 mt-2 capitalize">

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