import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const CompareProducts = () => {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = () => {

        const data =
            JSON.parse(localStorage.getItem("compareProducts")) || [];

        setProducts(data);

    };

    const removeProduct = (id) => {

        const updated = products.filter(
            (item) => item.product_id !== id
        );

        localStorage.setItem(
            "compareProducts",
            JSON.stringify(updated)
        );

        setProducts(updated);

    };

    const clearComparison = () => {

        localStorage.removeItem("compareProducts");

        setProducts([]);

    };

    if (products.length === 0) {

        return (

            <div className="min-h-screen flex flex-col justify-center items-center">

                <h1 className="text-3xl font-bold">
                    No Products Added
                </h1>

                <button

                    onClick={() => navigate("/")}

                    className="mt-6 bg-yellow-400 px-8 py-3 rounded-full font-semibold"

                >

                    Continue Shopping

                </button>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-white p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-bold">

                    Compare Products

                </h1>

                <button

                    onClick={clearComparison}

                    className="bg-red-500 text-white px-5 py-2 rounded"

                >

                    Clear All

                </button>

            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">

                <table className="min-w-full bg-white">

                    <thead>

                        <tr className="bg-gray-200  text-black">

                            <th className="p-4 text-left min-w-[180px]">

                                Specification

                            </th>

                            {

                                products.map(product => (

                                    <th

                                        key={product.product_id}

                                        className="p-4 min-w-[280px]"

                                    >

                                        <div className="flex flex-col items-center">

                                            <img onClick={()=>navigate(`/product/${product.product_id}`)}

                                                src={product.image_url}

                                                className="h-40 object-contain cursor-pointer"

                                                alt=""

                                            />

                                            <h2 onClick={()=>navigate(`/product/${product.product_id}`)}
                                            className="mt-3 font-bold cursor-pointer">

                                                {product.product_name}

                                            </h2>

                                            <button

                                                onClick={() => removeProduct(product.product_id)}

                                                className="mt-3 text-red-600"

                                            >

                                                <FiTrash2 size={22} />

                                            </button>

                                        </div>

                                    </th>

                                ))

                            }

                        </tr>

                    </thead>

                    <tbody>

                        <Row
                            title="Brand"
                            products={products}
                            field="brand"
                        />

                        <Row
                            title="Price"
                            products={products}
                            field="price"
                            money
                        />

                        <Row
                            title="RAM"
                            products={products}
                            field="ram"
                        />

                        <Row
                            title="Storage"
                            products={products}
                            field="storage"
                        />

                        <Row
                            title="Processor"
                            products={products}
                            field="processor"
                        />

                        <Row
                            title="Chipset"
                            products={products}
                            field="chipset"
                        />

                        <Row
                            title="Operating System"
                            products={products}
                            field="operating_system"
                        />

                        <Row
                            title="Display"
                            products={products}
                            field="display"
                        />

                        <Row
                            title="Refresh Rate"
                            products={products}
                            field="refresh_rate"
                        />

                        <Row
                            title="Rear Camera"
                            products={products}
                            field="rear_camera"
                        />

                        <Row
                            title="Front Camera"
                            products={products}
                            field="front_camera"
                        />

                        <Row
                            title="Battery"
                            products={products}
                            field="battery"
                        />

                        <Row
                            title="Charging"
                            products={products}
                            field="charging"
                        />

                        <Row
                            title="Weight"
                            products={products}
                            field="weight"
                        />

                        <Row
                            title="Stock"
                            products={products}
                            field="stock"
                        />

                        <Row
                            title="Rating"
                            products={products}
                            field="rating"
                        />

                        <Row
                            title="Reviews"
                            products={products}
                            field="reviews"
                        />

                    </tbody>

                </table>

            </div>

        </div>

    );

};

function Row({

    title,

    products,

    field,

    money = false

}) {

    return (

        <tr className="border-b">

            <td className="font-bold p-4 bg-gray-50">

                {title}

            </td>

            {

                products.map(product => (

                    <td

                        key={product.product_id}

                        className="text-center p-4"

                    >

                        {

                            money

                                ?

                                `₹${product[field]}`

                                :

                                product[field]

                        }

                    </td>

                ))

            }

        </tr>

    );

}

export default CompareProducts;