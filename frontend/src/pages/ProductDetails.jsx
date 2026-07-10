import { useCallback, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import logo from "../assets/Heart and share logo.png"
import { IoShareOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";


const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showWishlistBox, setShowWishlistBox] = useState(false);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate=useNavigate()

const token = localStorage.getItem("token");

console.log("Token =", token);

    const getProduct = useCallback(async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/products/${id}`
            );

            const data = res.data.data;
            const productImage = (data.image_url || "").trim();
            const matchingVariation = data.variations?.find(
                (variation) => (variation.image_url || "").trim() === productImage
            );

                setProduct(data);

                setSelectedVariation(matchingVariation || null);

        }
        catch(error) {

            console.log(error);

        }

    }, [id]);

    const getRelatedProducts = useCallback(async () => {

    try {

        const res = await axios.get(
            `http://localhost:5000/products/related/${id}`
        );

        setRelatedProducts(res.data.data || []);

    } catch (error) {

        console.log(error);
        setRelatedProducts([]);

    }

}, [id]);



    const getReviews = useCallback(async () => {
            
        try {

            const res = await axios.get(
                `http://localhost:5000/reviews/${id}`
            );

            setReviews(res.data.data);

        }
        catch(error) {

            console.log(error);

        }

    }, [id]);

    useEffect(() => {
    if (id) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getProduct();
        getReviews();
        getRelatedProducts();
    }
}, [id, getProduct, getReviews, getRelatedProducts]);

    const handleLoginRedirect = (action)=>{

        localStorage.setItem(
            "pendingProduct",
            product.product_id
        );

        localStorage.setItem(
            "cartAction",
            action
        );

    navigate("/login");

};
    const addWishlist = async()=>{


    const token = localStorage.getItem("token");


    if(!token){

        navigate("/login");

        return;

    }


    try{


        await axios.post(

            "http://localhost:5000/wishlist/add",

            {

                product_id:product.product_id

            },

            {

                headers:{

                    Authorization:

                    `Bearer ${token}`

                }

            }

        );


        setShowWishlistBox(true);


    }


    catch(error){

        console.log(error);

    }


};
    const addToCart = async () => {

    const token = localStorage.getItem("token");


    if(!token){

        handleLoginRedirect("cart");

        return;

    }


    try{

        await axios.post(

        "http://localhost:5000/cart/add",

        {
            product_id:product.product_id,
            variation_id: selectedVariation?.variation_id,
            quantity:1
        },
        {
            headers:{

                Authorization:

                `Bearer ${token}`

            }

        }

        );

        alert("Product added to cart")
        navigate("/cart");


    }
    catch(error){

        console.log(error);

    }

};
    const buyNow = async()=>{

    const token = localStorage.getItem("token");

        if(!token){

            handleLoginRedirect("checkout");

            return;

        }


        try{


            await axios.post(

            "http://localhost:5000/cart/add",

                {
                product_id:product.product_id,
                variation_id: selectedVariation?.variation_id,
                quantity:1
                },

                {

                headers:{

                Authorization:

                `Bearer ${token}`

                }

                }

                );


                navigate("/checkout");


        }

        catch(error){

            console.log(error);

        }


    };

    const addFrequentlyBought = async () => {

        const token = localStorage.getItem("token");
        const frequentlyBoughtProduct = relatedProducts[0];

        if (!token) {
            handleLoginRedirect("cart");
            return;
        }

        if (!frequentlyBoughtProduct) {
            return;
        }

        try {

            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    product_id: product.product_id,
                    variation_id: selectedVariation?.variation_id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    product_id: frequentlyBoughtProduct.product_id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/cart");

        } catch (error) {

            console.log(error);

        }

    };


    const addToCompare = () => {

    let compareProducts =
        JSON.parse(localStorage.getItem("compareProducts")) || [];

    // Already exists
    if (
        compareProducts.find(
            item => item.product_id === product.product_id
        )
    ) {
        alert("Already added");
        return;
    }

    // Maximum 4 products
    if (compareProducts.length >= 4) {
        alert("Maximum 4 products");
        return;
    }

    compareProducts.push(product);

    localStorage.setItem(
        "compareProducts",
        JSON.stringify(compareProducts)
    );

    navigate("/compare");
};
    

    if(!product) {

        return <h1>Loading...</h1>;

    }

    const selectedImage = selectedVariation?.image_url || product.image_url;
    const selectedPrice = selectedVariation?.price || product.price;
    const selectedColor = selectedVariation?.color || "White";
    const variations = product.variations || [];
    const frequentlyBoughtProduct = relatedProducts[1];
    const relevantProducts = relatedProducts.slice(1);
    const frequentlyBoughtTotal =
        Number(selectedPrice || 0) + Number(frequentlyBoughtProduct?.price || 0);

    return (

        <div className=" bg-white min-h-screen p-0.5 ">
            <div className="hidden md:flex items-center justify-between px-5 border-b border-gray-300 py-3">
                <h2 className="text-2xl font-bold ml-7 text-gray-700">Electronics</h2>
                <div className="flex items-center justify-between gap-[clamp(28px,4vw,76px)] text-base">
                    <h2 className="text-gray-700">Laptops and accessories</h2>
                    <h2 className="text-gray-700">TV and Home Entertainment</h2>
                    <h2 className="text-gray-700">Audio</h2>
                    <h2 className="text-gray-700">Cameras</h2>
                    <h2 className="text-gray-700">Smart Technology</h2>
                    <h2 className="text-gray-700">Sales and Deals</h2>
                </div>
            </div>
            <img className="hidden md:block mx-auto w-[clamp(640px,49vw,900px)] h-13 object-cover"
            src="https://m.media-amazon.com/images/I/51-O1L1MHWL.jpg" />

            <h2 className="hidden md:block text-gray-500 text-sm mt-4 ml-7 mb-3">Electronics › Mobiles & Accessories › Smartphones & Basic Mobiles › Smartphones</h2>
            <div className="grid grid-cols-1 gap-x-[clamp(12px,1.5vw,28px)] md:grid-cols-[minmax(280px,40vw)_minmax(300px,1fr)] lg:grid-cols-[minmax(400px,36vw)_minmax(420px,1fr)_clamp(250px,17vw,295px)]">
                <div className="bg-white md:hidden rounded-lg flex items-center m-1">

                    <img className="p-2 w-16 h-16 object-contain"
                    src="https://i.pinimg.com/736x/cb/44/0b/cb440bf81ad4dbb9a3b2ddaf04751f39.jpg" />

                    <div className="ml-2">
                       
                    <h2 className="inline text-sm font-bold">
                            Samsung S26 Ultra
                    </h2>

                    <span className="text-sm pl-1 font-medium">
                           Samsung Galaxy S26 Ultra 5G...
                    </span>
                       
                       <div className="flex items-center justify-between mb-3">
                         <h2>₹1,39,000
                        <span className="text-blue-600 font-semibold text-xs ml-1.5">
                        <snap className="text-orange-400 items-end">✓</snap>prime
                        </span>
                        </h2>
                        <h2 className="lg:hidden text-xs font-medium text-black text-right -mr-3 ">Sponsored ⓘ</h2>
                       </div>
                    </div>
                </div>
                
                <div className="min-w-0 bg-white p-1 dark:bg-gray-800 lg:p-2">
                <h2 className="md:hidden -mt-1 text-[14px] ml-2 text-cyan-600 flex items-center justify-between">Brand: {product.brand}
                <span className="flex items-center">  
                        <FaStar className="text-yellow-600 ml-2 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaRegStar className="text-yellow-600 text-sm mr-1" />
                        <span className="text-black text-sm">1224</span>
                        </span></h2>
                <h2 className="md:hidden text-sm ml-2 text-gray-500 line-clamp-2 leading-tight">{product.description}</h2>

                <h2 className=" md:hidden text-[14px] font-bold ml-2 mt-2 mb-1"> 400+ bought<span className=" text-sm font-normal"> in past month</span></h2>
                
    <div className="relative flex w-full flex-row items-start gap-[clamp(8px,1vw,16px)]">
    
    <div className="sticky top-20 hidden flex-col items-center gap-3 md:flex">
        <button className="w-14 h-14 p-1 border-2 border-blue-600 rounded-xl bg-white overflow-hidden active:scale-95 transition-transform">
            <img src={selectedImage} className="w-full h-full object-contain" alt="thumb" />
        </button>

        <button className="w-14 h-14 bg-gray-800 text-white rounded-xl flex flex-col items-center justify-center text-[10px] font-bold shadow-sm active:scale-95 transition-transform">
            
           
        </button>

        {variations.slice(0, 3).map((variation) => (
            <button
                key={variation.variation_id}
                onClick={() => setSelectedVariation(variation)}
                className={`w-14 h-14 p-1 rounded-xl bg-white overflow-hidden active:scale-95 transition-transform ${
                    selectedVariation?.variation_id === variation.variation_id
                        ? "border-2 border-blue-600"
                        : "border border-gray-300"
                }`}
            >
                <img src={variation.image_url} className="w-full h-full object-contain" alt={variation.color} />
            </button>
        ))}
    </div>

    <div className="relative min-w-0 flex-1 self-start md:sticky md:top-20">
        <img 
            src={selectedImage}
            className="h-[clamp(320px,38vw,560px)] w-full rounded-lg object-contain"
            alt={product.product_name}
        />
        
        <div className="hidden absolute top-4 right-4 md:flex flex-col gap-3 z-10">
            <button className="p-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-md transition-transform active:scale-95 flex items-center justify-center border border-gray-100">
                <FiHeart size={22} />
            </button>

            <button className="p-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-md transition-transform active:scale-95 flex items-center justify-center border border-gray-100">
                <IoShareOutline size={22} />
            </button>
        </div>
    </div>

</div>
                <div className="md:hidden flex items-center justify-between">
                    <h2 className="text-center text-base ml-43 my-3">● <span className="text-gray-400"> ● ● ● </span><span className="text-xs text-gray-400"> ●</span></h2>
                <img className="h-9 w-20 object-contain"
                src={logo} />
                </div>
                
            </div>
            <div className="min-w-0 bg-white p-2 dark:bg-gray-800 md:p-[clamp(10px,1vw,16px)]">
                <h1 className="hidden text-3xl font-bold mt-2">
                    {product.product_name}
                </h1>
                <p className="hidden text-blue-00 mt-1.5 font-medium">Brand: {product.brand}</p>

                
                <div className="hidden md:block md:ml-[clamp(6px,1.2vw,22px)]">
                <p className="line-clamp-3 text-[clamp(21px,1.55vw,29px)] leading-tight">{product.description}</p>
                <p className="mt-1 text-base text-cyan-600">Visit the Samsung Store</p>
                <div className="flex items-center text-sm">
                    <p>{product.rating}</p>
                    <div className="flex items-center gap-0.5">
                        <FaStar className="text-yellow-600 ml-2 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaStar className="text-yellow-600 text-sm" />
                        <FaRegStar className="text-yellow-600 text-sm mr-1" />
                    </div>
                        <span className="text-cyan-600">({product.reviews})</span>
                        <hr className="border h-5 mx-2 border-gray-500" />

                        <p className="text-cyan-500">Search this page</p>
                </div>
                <p className="bg-black text-white rounded-md w-fit px-1 my-2 py-0.5 text-sm">Amazon's Choice</p>
                <p className="font-bold mb-1 text-sm">100+ bought <span className="font-normal">in past month</span></p>
                <hr className="border border-gray-200 " />
                </div>

                <h2 className="md:ml-[clamp(6px,1.2vw,22px)] text-[clamp(26px,1.8vw,34px)] font-medium mt-4">
                    <span className="text-red-600 font-normal text-[clamp(22px,1.4vw,28px)]">-11%</span> ₹{selectedPrice}
                </h2>
                <p className="mt-1 md:ml-[clamp(6px,1.2vw,22px)] text-sm text-gray-500">M.R.P: 
                    <span className="line-through"> ₹{product.mrp}</span></p>

                <p className=" mt-2 font-semibold md:ml-[clamp(6px,1.2vw,22px)] ">Varient: {product.storage}</p>

                <p className="md:ml-[clamp(6px,1.2vw,22px)] mt-1 text-base">Inclusive of all taxes</p>
                <p className="md:ml-[clamp(6px,1.2vw,22px)] hidden md:block text-base leading-snug">
                    <span className="font-bold">EMI</span> starts at ₹2,988. No Cost EMI available<br /> 
                    <span className="ml-1 text-indigo-600">EMI options <span className="text-black"> ⌵</span></span><br />
                    <span className="text-indigo-600 hover:text-blue-900 hover:underline cursor-pointer">Join Prime to buy this item at ₹74,999.00</span>
                </p>
                <div className="md:ml-[clamp(6px,1.2vw,22px)] mt-3">
                    <div className="mb-2 flex items-center gap-2 text-base font-bold">
                        <img className="h-6 w-6" src="https://img.icons8.com/?size=100&id=12089&format=png" />
                        <span>Offers</span>
                    </div>
                </div>
                
                {/* <p className="md:ml-16 text-indigo-600 hover:underline cursor-pointer">Save up to 18% with business pricing and GST input tax credit. Sign up for a free Amazon Business account</p> */}
                

                <div className="md:ml-[clamp(6px,1.2vw,22px)] grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">

                <div className="border border-gray-300 shadow-sm dark:border-gray-100 rounded-md px-3 py-2 text-sm"><span className="font-bold">Cashback</span>
                    <br />

                Upto ₹50.00 cashback as Amazon Pay Balance when you pay with select Cards<br />
                <span className="text-blue-500 hover:underline cursor-pointer">3 offers</span>

                </div>

                <div className="border h-auto border-gray-300 shadow-sm dark:border-gray-100 rounded-md px-3 py-2 text-sm line-clamp-5"><span className="font-bold">Bank Offer</span>
                    <br />

                10% Instant Discount up to INR 1000 on ICICI Bank Credit Card <br />
                <span className="text-blue-500 hover:underline cursor-pointer">16 offers</span>
                </div>

                <div className="hidden border h-auto border-gray-300 shadow-sm dark:border-gray-100 rounded-md px-3 py-2 text-sm line-clamp-5 md:block"><span className="font-bold">No Cost EMI</span>
                    <br />
                Upto ₹2,988 EMI interest savings on select cards<br />
                <span className="text-blue-500 hover:underline cursor-pointer">1 offer</span>
                </div>

                
            </div>
            <div className="md:ml-[clamp(6px,1.2vw,22px)] mt-4 border-b border-gray-300 pb-5 dark:border-gray-600">
                <h2 className="text-base font-semibold mb-3">
                    Colour:
                    <span className="font-bold ml-2">
                        {selectedColor}
                    </span>
                </h2>

                <div className="flex gap-3 flex-wrap">
                    {variations.map((item) => (
                        <div
                            key={item.variation_id}
                            onClick={() => setSelectedVariation(item)}
                            className={`w-[82px] cursor-pointer rounded-xl overflow-hidden transition border ${
                                selectedVariation?.variation_id === item.variation_id
                                    ? "border-blue-600 border-2"
                                    : "border-gray-300"
                            }`}
                        >
                            <img
                                src={item.image_url}
                                className="h-20 w-full object-contain border-b"
                                alt={item.color}
                            />

                            <div className="p-2 text-sm">
                                <h2 className="font-bold">
                                    {item.color}
                                </h2>

                                <p>
                                    ₹{item.price}
                                </p>
                                <p>{item.storage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="md:ml-[clamp(6px,1.2vw,22px)] mt-4 border-gray-300 dark:border-gray-600"></hr>

            <h2 className="md:ml-[clamp(6px,1.2vw,22px)] font-bold text-xl mt-3">About this item</h2>

            <p className="md:ml-[clamp(6px,1.2vw,22px)] mt-2 text-base font-medium text-black dark:text-gray-300">
                    {product.description}
                </p>

            
            </div>

            
            <div className="w-full bg-white px-[clamp(10px,1vw,16px)] py-[clamp(10px,1vw,16px)] dark:bg-gray-800 md:-mt-1">
            
                <div className="border mt-1 border-gray-300 dark:border-gray-100 p-4 md:py-4 mb-4 flex-row items-center justify-center
                rounded-lg">
                    <h2 className="text-[clamp(28px,2vw,36px)] font-medium ">
                    ₹{selectedPrice}
                </h2>
                <p className="mt-3 text-base lg:hidden">Save <span className="font-bold">₹10</span> extra using <span className="font-bold">💎100</span> <span className="text-blue-500 hover:underline cursor-pointer">Details</span></p>

                <p className="mt-4 text-base">FREE delivery tomorrow June to <span className="text-blue-500 hover:underline cursor-pointer underline">Bikaner 334001</span>. <span className="text-blue-500 underline cursor-pointer">Details</span></p>

                <p className="mt-4 text-base text-gray-600 leading-tight">+₹199 service fee. Delivery associate will open and verify item.<span className="text-blue-500 underline cursor-pointer">Details</span> </p>

                <p className="mt-4 text-base leading-tight">Or fastest delivery <span className="font-semibold">Wednesday, 8 July.</span> Order within <span className="text-gray-500">10 hr 36 mins.</span><br /><span className="text-blue-500 underline cursor-pointer">Details</span></p>

                <p className="mt-4 text-xl text-green-700">In Stock</p>

                <div className=" my-2 border border-gray-500 rounded-lg px-2 py-1 flex items-center justify-between">
                    <button className="text-base">Quantity:1</button>
                    <p className="text-2xl">⌵</p>
                </div>

                <button onClick={addToCart}
                    className="bg-yellow-300 mt-3 h-9 text-black font-bold active:scale-95 hover:bg-yellow-500 px-2 py-1 rounded-full w-full">
                   Add to Cart
                </button>

                <button onClick={buyNow}
                className="bg-orange-400 mt-3 h-9 text-black font-bold active:scale-95 hover:bg-yellow-600 px-2 py-1 rounded-full w-full">Buy Now</button>

                <button
                    onClick={addToCompare}
                    className="mt-3 border border-gray-400 w-full py-2 rounded-full hover:bg-gray-100"
                >
                    Compare Product
                </button>

                <button
                    onClick={addWishlist}
                    className="mt-3 flex min-h-9 w-full items-center justify-between overflow-hidden rounded-lg border border-[#ADB1B8] bg-white text-left text-[13px] text-[#0F1111] hover:bg-[#E7E9EC] active:bg-[#D5D9D9]"
                >
                    <span className="min-w-0 flex-1 px-3">
                        {showWishlistBox ? "Added to Wish List" : "Add to Wish List"}
                    </span>
                    <span className="flex min-h-9 w-10 shrink-0 items-center justify-center border-l border-[#ADB1B8] bg-white text-[19px]">
                         ⌵
                    </span>
                </button>

                </div>
                <div className="border border-gray-300 dark:border-gray-100 p-2  flex-row items-center justify-center
                rounded-lg">
                    <img className="rounded-lg object-cover" src="https://i.pinimg.com/736x/ed/1e/3e/ed1e3e53ec7837cb55d7167bec051f0b.jpg"/>
                    <p className="mt-2 font-medium">Save up to 18% on this product with business pricing and GST input tax credit</p>
                    <button className="border dark:border-gray-100 hover:border-blue-500  rounded-lg px-2 py-1  mt-2 mx-15">
                        Create a free account
                    </button>
                </div>
            </div>


            </div>

            {frequentlyBoughtProduct && (
            <div className="mt-10 border-t border-b border-gray-300 bg-white px-4 py-4 md:px-10">

                <h2 className="mb-4 text-2xl font-bold">
                    Frequently bought together
                </h2>

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    <div className="flex flex-wrap items-start gap-4">
                        <div className="w-[clamp(150px,18vw,230px)]">
                            <div className="relative flex h-44 items-center justify-center rounded-lg bg-gray-50 p-3">
                                <img onClick={()=>scrollTo(0,0)}
                                    src={selectedImage}
                                    alt={product.product_name}
                                    className="max-h-full max-w-full object-contain cursor-pointer"
                                />
                                <input
                                    type="checkbox"
                                    checked
                                    readOnly
                                    className="absolute right-2 top-2 h-4 w-4 accent-[#2162A1]"
                                />
                            </div>
                            <p className="mt-3 line-clamp-3 text-base">
                                <span className="font-bold">This item: </span>
                                {product.product_name || product.description}
                            </p>
                            <p className="mt-2 text-xl">
                                ₹{Number(selectedPrice).toLocaleString("en-IN")}
                                <sup className="text-xs">00</sup>
                            </p>
                        </div>

                        <div className="pt-16 text-3xl font-bold text-gray-600">
                            +
                        </div>

                        <div className="w-[clamp(150px,18vw,230px)]">
                            <div className="relative flex h-44 items-center justify-center rounded-lg bg-gray-50 p-3">
                                <img onClick={()=>navigate(`/product/${frequentlyBoughtProduct.product_id}`)}
                                    src={frequentlyBoughtProduct.image_url}
                                    alt={frequentlyBoughtProduct.product_name}
                                    className="max-h-full max-w-full object-contain cursor-pointer"
                                />
                                <input
                                    type="checkbox"
                                    checked
                                    readOnly
                                    className="absolute right-2 top-2 h-4 w-4 accent-[#2162A1]"
                                />
                            </div>
                            <p
                                onClick={() => navigate(`/product/${frequentlyBoughtProduct.product_id}`)}
                                className="mt-3 line-clamp-3 cursor-pointer text-base text-[#0066C0] hover:text-[#C45500] hover:underline"
                            >
                                {frequentlyBoughtProduct.product_name || frequentlyBoughtProduct.description}
                            </p>
                            <p className="mt-2 text-xl">
                                ₹{Number(frequentlyBoughtProduct.price)}
                                <sup className="text-xs">00</sup>
                            </p>
                        </div>
                    </div>

                    <div className="min-w-[260px] lg:ml-4">
                        <p className="mb-2 text-lg font-medium">
                            Total price:{" "}
                            <span>
                                ₹{frequentlyBoughtTotal}
                                
                            </span>
                        </p>
                        <button
                            onClick={addFrequentlyBought}
                            className="w-full rounded-full bg-[#FFD814] px-8 py-2 text-base text-[#0F1111] hover:bg-[#F7CA00] lg:w-80"
                        >
                            Add both to Cart
                        </button>
                    </div>
                </div>

                {relevantProducts.length > 0 && (
                    <div className="mt-8 border-t border-gray-300 pt-3">
                        <h2 className="mb-4 w-fit  px-1 text-xl font-bold ">
                            Relevant items customers are likely to buy
                        </h2>

                        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
                            {relevantProducts.map((item) => (
                                <div
                                    key={item.product_id}
                                    onClick={() => navigate(`/product/${item.product_id}`)}
                                    className="cursor-pointer bg-white p-3 transition hover:shadow-lg"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.product_name}
                                        className="h-36 w-full object-contain"
                                    />

                                    <h3 className="mt-3 line-clamp-2 text-sm text-[#0066C0] hover:text-[#C45500] hover:underline">
                                        {item.product_name}
                                    </h3>

                                    <p className="mt-2 text-lg font-bold">
                                        ₹{Number(item.price).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            )}
            
                <div className="mt-8 mx-4 lg:mx-20 flex flex-col items-center justify-center h-35 bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className=" text-center text-2xl font-semibold">Write a review</h2>
                 <button

                    onClick={() => navigate(`/write-review/${product.product_id}`)}

                    className="bg-yellow-400 mt-3 active:scale-95 text-black font-bold px-8 py-3 rounded-full"

                >

                        Write a Review

                </button>

           

            </div>



            <div className="mt-8 w-full">
    <h2 className="text-2xl font-bold mb-5">Customer Reviews</h2>

    {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
            // Fallback to index if review_id doesn't match your SQL column name
            <div
                key={review.review_id || review.id || index} 
                className="bg-white dark:bg-gray-800 p-5 rounded mb-4 shadow-sm border border-gray-100"
            >
                 <p className="font-semibold text-gray-500 text-sm">Review #{index + 1}</p>
                 <p className="mt-1 text-gray-800 dark:text-gray-200">
                    {review.comment || "No text comment provided."}
                 </p>
                 <p className="text-sm text-yellow-600 mt-1">Rating: {review.rating} ★</p>
            </div>
        ))
    ) : (
        <p className="text-gray-500 italic">No reviews yet for this product.</p>
    )}
</div>
            

        </div>

    );

};


export default ProductDetails;
