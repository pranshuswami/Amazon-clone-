import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const FilterSidebar = ({
    filters,
    setFilters,
    brands
}) => {

    const [priceRange, setPriceRange] = useState([185, 40900]);
    const [showAllBrands, setShowAllBrands] = useState(false);

    const selectBrand = (brand) => {

        let updatedBrands;

        if (filters.brand.includes(brand)) {

            updatedBrands = filters.brand.filter(
                (item) => item !== brand
            );

        } else {

            updatedBrands = [
                ...filters.brand,
                brand
            ];

        }

        setFilters({

            ...filters,

            brand: updatedBrands

        });

    };

    const priceFilter = (min, max) => {

        setFilters({

            ...filters,

            minPrice: min,

            maxPrice: max

        });

    };

    const colors = [
        "#000000",
        "#5C4033",
        "#F6C7D7",
        "#3CB371",
        "#4169E1",
        "#D4AF37",
        "#DCDCDC",
        "#FF4500",
        "#7FFF00"
    ];

    


    return (

    <div className="w-full ml-2 mt-3 leading-5 bg-white dark:bg-black text-sm text-black dark:text-white font-stretch-50%">

        <div className="mb-6">

            <h2 className="font-bold text-lg mb-2">
                Eligible for Free Delivery
            </h2>

            <label className="flex items-center gap-2 cursor-pointer">

                <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600"
                />

                <span className="text-lg">Free Shipping</span>

            </label>

            <p className="mt-1 leading-6 text-lg">
                Get FREE Shipping on eligible orders shipped by Amazon
            </p>

        </div>

        <div className="mb-7">

            <h2 className="font-bold text-lg mb-2">
                Brands
            </h2>

            <div className="space-y-0.5">

    {(showAllBrands ? brands : brands.slice(0, 7)).map((brand) => (

        <label
            key={brand}
            className="flex items-center gap-2 cursor-pointer hover:text-orange-600 text-lg"
        >

            <input
                type="checkbox"
                className="w-5 h-5 accent-blue-600"
                checked={filters.brand.includes(brand)}
                onChange={() => selectBrand(brand)}
            />

            <span>{brand}</span>

        </label>

    ))}

    {brands.length > 7 && (

        <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="text-blue-600 hover:text-orange-600 font-medium text-sm mt-2"
        >
            {showAllBrands ? "˄ See less " : "⌵ See more "}
        </button>

    )}

</div>

        </div>

        <div className="mb-7">

            <h2 className="font-bold text-lg mb-3">
                Price
            </h2>

            <h3 className="font-semibold text-lg mb-4">
                ₹185 – ₹40,900+
            </h3>

            <input
                type="range"
                min="185"
                max="40900"
                value={priceRange[1]}
                onChange={(e) =>
                    setPriceRange([
                        priceRange[0],
                        Number(e.target.value)
                    ])
                }
                className="w-full accent-blue-600 cursor-pointer"
            />

            <div className="mt-5 space-y-2">

                <p
                    onClick={() => priceFilter(0, 450)}
                    className="cursor-pointer text-base hover:text-orange-600"
                >
                    Up to ₹450
                </p>

                <p
                    onClick={() => priceFilter(450, 2500)}
                    className="cursor-pointer text-base hover:text-orange-600"
                >
                    ₹450 - ₹2,500
                </p>

                <p
                    onClick={() => priceFilter(2500, 6700)}
                    className="cursor-pointer text-base hover:text-orange-600"
                >
                    ₹2,500 - ₹6,700
                </p>

                <p
                    onClick={() => priceFilter(6700, 20000)}
                    className="cursor-pointer text-base hover:text-orange-600"
                >
                    ₹6,700 - ₹20,000
                </p>

                <p
                    onClick={() => priceFilter(20000, "")}
                    className="cursor-pointer text-base hover:text-orange-600"
                >
                    Over ₹20,000
                </p>

            </div>

        </div>

        <div className="mb-7">

    <h2 className="font-bold text-lg mb-3">
        Customer Reviews
    </h2>

    {[4, 3, 2, 1].map((rating) => (

        <div
            key={rating}
            onClick={() =>
                setFilters({
                    ...filters,
                    rating
                })
            }
            className="flex items-center text-base gap-1 cursor-pointer hover:text-orange-600 mb-2"
        >

            {[1, 2, 3, 4, 5].map((star) => (

    star <= rating ? (

        <FaStar
            key={star}
            className="text-orange-400 text-[19px]"
        />

    ) : (

        <FaRegStar
            key={star}
            className="text-orange-400 text-[19px]"
        />

    )

))}

            <span className="text-[17px]">& Up</span>

        </div>

    ))}

</div>

        <div className="mb-7">

            <h2 className="font-bold text-[22px] mb-3">
                Deals & Discounts
            </h2>

            <div className="space-y-2">

                <p className="cursor-pointer hover:text-orange-600">
                    All Discounts
                </p>

                <p className="cursor-pointer hover:text-orange-600">
                    Buy More, Save More
                </p>

                <p className="cursor-pointer hover:text-orange-600">
                    Coupons
                </p>

                <p className="cursor-pointer hover:text-orange-600">
                    Today's Deals
                </p>

            </div>

        </div>

        <div>

            <h2 className="font-bold text-[22px] mb-3">
                Band Colour
            </h2>

            <div className="flex flex-wrap gap-2">

                {

                    colors.map((color, index) => (

                        <button
                            key={index}
                            style={{
                                backgroundColor: color
                            }}
                            className="w-6 h-6 border border-gray-400 rounded-sm hover:scale-110 transition"
                        />

                    ))

                }

            </div>

        </div>

    </div>

);
}

export default FilterSidebar;