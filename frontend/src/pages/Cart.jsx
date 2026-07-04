import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const res = await axios.get("http://localhost:5000/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setCart(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuantity = async (cart_id, quantity) => {
        if (quantity < 1) return;

        try {
            await axios.put(
                "http://localhost:5000/cart/update",
                { cart_id, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setCart(
                cart.map((item) =>
                    item.cart_id === cart_id ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setCart(cart.filter((item) => item.cart_id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAll = async () => {
        try {
            await axios.delete("http://localhost:5000/cart/clear", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setCart([]);
        } catch (error) {
            console.log(error);
        }
    };

    const subtotal = cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 p-2 md:p-6 text-[#0F1111]">
            <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                
                {/* --- TOP FIXED SUMMARY FOR MOBILE VIEW ONLY --- */}
                <div className="block lg:hidden bg-white p-4 border-b border-gray-200">
                    <h2 className="text-xl">
                        Subtotal <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-emerald-700 my-1">
                        <span className="bg-emerald-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">✓</span>
                        <span>Your order qualifies for FREE Delivery.</span>
                    </div>
                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] border border-[#FCD200] rounded-lg py-2.5 mt-2 font-medium shadow-sm transition-colors text-sm"
                    >
                        Proceed to Buy ({cart.length} item{cart.length !== 1 ? 's' : ''})
                    </button>
                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs">
                        <p>Add 1 item more, <span className="font-bold text-amber-800">save 10%</span></p>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                            <div className="w-1/2 h-full bg-emerald-600 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN PRODUCT LIST COMPONENT --- */}
                <div className="lg:col-span-9 bg-white p-4 md:p-6 shadow-sm rounded-sm">
                    <div className="hidden lg:flex justify-between items-end border-b border-gray-200 pb-2">
                        <div>
                            <h1 className="text-3xl font-normal">Shopping Cart</h1>
                            <button 
                                onClick={deleteAll}
                                className="text-[#007185] hover:text-[#C45500] hover:underline text-sm font-medium mt-1"
                            >
                                Deselect all items
                            </button>
                        </div>
                        <span className="text-gray-500 text-sm">Price</span>
                    </div>

                    <div className="flex lg:hidden justify-between items-center py-2">
                        <h1 className="text-xl font-bold">Items</h1>
                        <button 
                            onClick={deleteAll}
                            className="text-[#007185] text-sm"
                        >
                            Deselect all ({cart.length})
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <h2 className="text-xl font-medium">Your Shopping Cart is empty.</h2>
                            <button onClick={() => navigate("/")} className="text-[#007185] hover:underline mt-2 inline-block">
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <div key={item.cart_id} className="py-5 flex flex-col md:flex-row gap-4 items-start">
                                    
                                    {/* Checkbox Wrapper */}
                                    <div className="hidden md:flex items-center pt-8">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="w-4 h-4 rounded border-gray-300 accent-[#007185] cursor-pointer"
                                        />
                                    </div>

                                    {/* Product Image Container */}
                                    <div className="w-full md:w-44 h-44 flex-shrink-0 bg-gray-50 p-2 rounded flex items-center justify-center relative">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="absolute top-2 left-2 block md:hidden w-5 h-5 rounded border-gray-300 accent-[#007185]"
                                        />
                                        <img
                                            onClick={() => navigate(`/product/${item.product_id}`)}
                                            src={item.image_url}
                                            className="max-w-full max-h-full object-contain cursor-pointer mix-blend-multiply"
                                            alt={item.description}
                                        />
                                    </div>

                                    {/* Product Metadata & Action Hub */}
                                    <div className="flex-1 min-w-0 w-full">
                                        <div className="flex justify-between gap-4">
                                            <h2
                                                onClick={() => navigate(`/product/${item.product_id}`)}
                                                className="text-base md:text-lg font-medium line-clamp-2 cursor-pointer hover:text-[#007185] transition-colors leading-snug"
                                            >
                                                {item.description}
                                            </h2>
                                            <span className="text-lg font-bold whitespace-nowrap hidden md:block">
                                                ₹{Number(item.price).toLocaleString('en-IN')}
                                            </span>
                                        </div>

                                        <p className="text-xs text-emerald-700 font-medium mt-1">In stock</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Eligible for FREE Shipping</p>

                                        {/* Gift Flag Widget */}
                                        <label className="inline-flex items-center gap-1.5 mt-2 cursor-pointer text-xs">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#007185]" />
                                            <span>This will be a gift</span>
                                            <span className="text-[#007185] hover:underline">Learn more</span>
                                        </label>

                                        <div className="block md:hidden mt-2">
                                            <span className="text-xl font-bold">
                                                ₹{Number(item.price).toLocaleString('en-IN')}
                                            </span>
                                        </div>

                                        {/* Action Bar controls */}
                                        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                                            <div className="flex items-center bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg shadow-sm">
                                                <button
                                                    disabled={item.quantity === 1}
                                                    onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                                                    className="px-2.5 py-1.5 hover:bg-[#E3E6E6] rounded-l-lg disabled:opacity-30 transition-colors"
                                                >
                                                    <FiTrash2 className="w-3.5 h-3.5 text-gray-700" />
                                                </button>
                                                <span className="px-3 py-1 font-medium bg-white border-x border-[#D5D9D9] min-w-[2.5rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                                                    className="px-2.5 py-1.5 hover:bg-[#E3E6E6] rounded-r-lg transition-colors text-sm font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="text-gray-300 hidden sm:block">|</span>
                                            
                                            <button onClick={() => deleteItem(item.cart_id)} className="text-[#007185] hover:underline">
                                                Delete
                                            </button>
                                            
                                            <span className="text-gray-300">|</span>
                                            
                                            <button className="text-[#007185] hover:underline">
                                                Save for later
                                            </button>
                                            
                                            <span className="text-gray-300 hidden sm:block">|</span>
                                            
                                            <button className="text-[#007185] hover:underline hidden sm:block">
                                                Compare with similar items
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {cart.length > 0 && (
                        <div className="text-right border-t border-gray-200 pt-4 mt-2">
                            <h3 className="text-lg md:text-xl font-normal">
                                Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''}):{' '}
                                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                            </h3>
                        </div>
                    )}
                </div>

                {/* --- DESKTOP RIGHT SIDEBAR WIDGET --- */}
                {cart.length > 0 && (
                    <div className="hidden lg:block lg:col-span-3 bg-white p-5 shadow-sm rounded-sm sticky top-4">
                        <div className="flex items-start gap-2 text-sm text-emerald-700 leading-tight">
                            <span className="bg-emerald-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                            <div>
                                <p>Part of your order qualifies for FREE Delivery.</p>
                                <p className="text-gray-500 text-xs mt-0.5">
                                    Select this option at checkout. <span className="text-[#007185] hover:underline cursor-pointer">Details</span>
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-normal mt-4">
                            Subtotal ({cart.length} items): <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                        </h2>

                        <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#007185]" />
                            <span>This order contains a gift</span>
                        </label>

                        <button
                            onClick={() => navigate("/checkout")}
                            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] border border-[#FCD200] rounded-lg py-2 mt-4 font-medium text-sm shadow-sm transition-colors"
                        >
                            Proceed to Buy
                        </button>

                        <div className="mt-4 border border-gray-200 rounded-lg divide-y divide-gray-200 text-xs">
                            <div className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100">
                                <span className="font-medium text-gray-700">EMI Available</span>
                                <span className="text-gray-400 text-base">⌄</span>
                            </div>
                        </div>

                        {/* Banner promotion mockup matching amazon ecosystem */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm tracking-wider">Offer</span>
                            <p className="text-xs font-bold text-slate-800 mt-2">Get ₹100 flat off on Prime</p>
                            <p className="text-[11px] text-slate-600 mt-1 leading-normal">Enjoy Unlimited Free express delivery on items daily.</p>
                            <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-xs py-1.5 mt-3 rounded-md font-medium text-slate-700 shadow-sm transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Cart;