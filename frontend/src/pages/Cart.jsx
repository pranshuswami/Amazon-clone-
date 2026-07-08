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

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const subtotal = cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-[#EAEDED] py-[clamp(18px,2vw,36px)] text-[#0F1111] font-sans antialiased text-[clamp(14px,0.85vw,16px)]">
            <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-start gap-[clamp(12px,1.4vw,24px)] px-[clamp(10px,1.6vw,20px)] lg:grid-cols-[minmax(0,1fr)_clamp(260px,20vw,340px)]">
                
                {/* --- MAIN CART CONTAINER --- */}
                <div className="bg-white p-[clamp(16px,1.8vw,28px)] shadow-sm rounded-none">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-4">
                        <div>
                            <h1 className="text-3xl relative top-1 font-medium tracking-tight">Shopping Cart</h1>
                            {cart.length > 0 && (
                                <button 
                                    onClick={deleteAll}
                                    className="text-[#007185] hover:text-[#C45500] hover:underline text-lg font-normal block mt-2"
                                >
                                    Deselect all items
                                </button>
                            )}
                        </div>
                        {cart.length > 0 && (
                            <span className="text-[#565959] text-[16px] font-normal pb-1 hidden md:block">Price</span>
                        )}
                    </div>

                    {cart.length === 0 ? (
                        <div className="py-12">
                            <h2 className="text-[26px] font-medium leading-9">Your Amazon Cart is empty.</h2>
                            <p className="text-[16px] text-[#565959] mt-3 leading-relaxed">
                                Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                            </p>
                            <button onClick={() => navigate("/")} className="text-[#007185] hover:text-[#C45500] hover:underline text-[16px] mt-4 inline-block font-normal">
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#E7E7E7]">
                            {cart.map((item) => (
                                <div key={item.cart_id} className="flex items-start gap-[clamp(12px,1.4vw,20px)] py-[clamp(16px,1.8vw,24px)]">
                                    
                                    {/* Checkbox */}
                                    <div className="flex items-center pt-12 flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="w-5 h-5 rounded-sm border-gray-300 accent-[#007185] cursor-pointer"
                                        />
                                    </div>

                                    {/* Product Image */}
                                    <div className="flex h-[clamp(150px,14vw,230px)] w-[clamp(150px,16vw,250px)] flex-shrink-0 items-center justify-center p-1 mix-blend-multiply">
                                        <img
                                            onClick={() => navigate(`/product/${item.product_id}`)}
                                            src={item.image_url}
                                            className="max-w-full max-h-full object-contain cursor-pointer"
                                            alt={item.description}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between gap-6 items-start">
                                            <div>
                                                <h2
                                                    onClick={() => navigate(`/product/${item.product_id}`)}
                                                    className="line-clamp-2 cursor-pointer text-[clamp(18px,1.25vw,24px)] font-medium leading-tight text-[#0F1111] transition-colors hover:text-[#007185]"
                                                >
                                                    {item.description}
                                                </h2>
                                                <p className="text-base text-emerald-700 font-medium mt-1.5">In stock</p>
                                                
                                                <div className="flex items-center gap-2 mt-2 text-base text-[#565959]">
                                                    <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-[#007185]" id={`gift-${item.cart_id}`} />
                                                    <label htmlFor={`gift-${item.cart_id}`} className="cursor-pointer">
                                                        This will be a gift <span className="text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer">Learn more</span>
                                                    </label>
                                                </div>
                                                <p className="mt-3"><span className="font-bold">Color:</span> White</p>

                                                {/* Action Panel */}
                                                <div className="flex flex-wrap items-center gap-3 mt-4 text-[14px]">
                                                    {/* Quantity Selector Container */}
                                                    <div className="flex items-center border-4 rounded-full border-yellow-400 shadow-sm gap-6 transition-colors">
                                                        <button
                                                            onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                                                            className="pl-3 pr-2 py-1 text-xl font-normal text-gray-700 disabled:opacity-30"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                        <p className="text-lg">{item.quantity}</p>
                                                        <button
                                                            onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                                                            className="pl-2 pr-3 py-1 text-xl font-bold text-gray-700"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <span className="text-[#DDD] font-light">|</span>
                                                    
                                                    <button onClick={() => deleteItem(item.cart_id)} className="text-[#007185] hover:text-[#C45500] hover:underline font-normal text-base">
                                                        Delete
                                                    </button>
                                                    
                                                    <span className="text-[#DDD] font-light">|</span>
                                                    
                                                    <button className="text-[#007185] hover:text-[#C45500] hover:underline font-normal text-base">
                                                        Save for later
                                                    </button>
                                                    
                                                    <span className="text-[#DDD] font-light hidden sm:block">|</span>
                                                    
                                                    <button className="text-[#007185] hover:text-[#C45500] hover:underline font-normal hidden sm:block text-base">
                                                        See more like this
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Right Align Item Price */}
                                            <div className="text-right flex-shrink-0">
                                                <span className="text-[20px] font-bold text-[#0F1111] block">
                                                    ₹{Number(item.price)}.00
                                                </span>
                                                <p className="text-end text-[13px] text-gray-600 mt-1 leading-snug">Up to 5% back with<br /> Amazon Pay ICICI card<br /><span className="text-indigo-600 cursor-pointer hover:underline">Terms</span> </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    {/* Left panel bottom subtotal summary bar */}
                    {cart.length > 0 && (
                        <div className="text-right border-t border-[#E7E7E7] pt-4 mt-2">
                            <h3 className="text-lg font-normal text-[#0F1111]">
                                Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
                                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}.00</span>
                            </h3>
                        </div>
                    )}
                </div>

                {/* --- RIGHT SIDEBAR SUMMARY CARD & OFFERS --- */}
                {cart.length > 0 && (
                    <div className="sticky top-4 grid grid-cols-1 gap-[clamp(12px,1.4vw,20px)]">
                        
                        {/* Subtotal Panel */}
                        <div className="bg-white p-[clamp(16px,1.5vw,24px)] shadow-sm rounded-none">
                            <div className="flex items-start gap-2.5 text-[#067D62] leading-tight">
                                <span className="bg-[#067D62] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-bold mt-0.5">✓</span>
                                <div>
                                   <p className="text-green-700 font-medium">Part of your order qualifies for FREE Delivery. Choose<span className="text-blue-700 underline cursor-pointer"> FREE Delivery</span> option at checkout.</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-normal mt-4 text-[#0F1111] ">
                                Subtotal ({totalItems} item(s)): <span className="inline font-bold text-[22px] mt-1">₹{subtotal.toLocaleString('en-IN')}.00</span>
                            </h2>

                            <div className="flex items-center gap-2.5 mt-3 cursor-pointer text-base text-[#0F1111]">
                                <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 accent-[#007185]" id="sidebar-gift" />
                                <label htmlFor="sidebar-gift" className="cursor-pointer select-none">This order contains a gift</label>
                            </div>
                            
                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] border border-[#FCD200] rounded-full py-2 mt-5 text-[15px] font-normal text-[#0F1111] shadow-sm transition-colors cursor-pointer text-center"
                            >
                                Proceed to Buy
                            </button>

                            <p className="mt-4 text-[15px] text-gray-800">
                                Save <span className="font-bold text-gray-900">₹9</span> extra using <span className="font-bold text-gray-900">💎 90</span> <span className="text-blue-600 cursor-pointer hover:underline text-[14px]">Details</span>
                            </p>

                            {/* Accordion Feature block */}
                            <div className="mt-4 border border-[#D5D9D9] rounded-md divide-y divide-gray-200 text-xl">
                                <div className="p-3 bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-md">
                                    <span className="text-[#0F1111] text-[15px] font-normal">EMI Available</span>
                                    <span className="text-black text-2xl leading-none">⌄</span>
                                </div>
                            </div>
                        </div>

                        {/* Blue Promotional Membership Box */}
                        <div className="flex min-h-[clamp(170px,14vw,220px)] flex-col justify-between bg-blue-600 p-[clamp(16px,1.5vw,24px)] text-white shadow-sm">
                            <div>
                                <h3 className="text-2xl leading-7 tracking-wide">
                                    Hurry!<span className="font-bold">Limited Period Offer - get ₹100 off on Prime Shopping Edition!</span>
                                </h3>
                                <p className="text-2xl font-normal mt-2 leading-relaxed opacity-95">
                                    FREE delivery, offers and multiple benefits - all in ONE membership!
                                </p>
                            </div>

                            <div className="mt-5">
                                <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] rounded-full py-2 px-4 text-lg font-medium shadow-sm transition-colors flex flex-col items-center justify-center leading-tight">
                                    <span>Join Prime Shopping Edition at</span>
                                    <span className="font-bold text-[15px] mt-0.5">
                                        <span className="line-through  font-normal mr-1.5">₹399</span> ₹299/year
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Cart;
