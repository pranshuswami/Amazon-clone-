import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { FiRotateCcw } from "react-icons/fi";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrder();
    }, [id]);

    const getOrder = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/order/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setOrder(res.data.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await axios.delete(
                `http://localhost:5000/order/cancel/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            alert("Order cancelled successfully");
            navigate("/orders");
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600 dark:text-gray-300">
                <span className="text-xl font-medium animate-pulse">Loading order details...</span>
            </div>
        );
    }

    if (!order || order.length === 0) {
        return (
            <div className="max-w-8xl mx-20 p-10 text-center">
                <p className="text-xl font-medium text-gray-600">No order details found.</p>
                <button onClick={() => navigate("/orders")} className="mt-4 text-blue-600 hover:underline">
                    Back to Your Orders
                </button>
            </div>
        );
    }

    const orderData = order[0];

    return (
        <div className="max-w-300 mx-auto px-4 sm:px-6 bg-white md:mt-4 md:py-6 py-8 text-gray-800 dark:text-gray-100">
            {/* Breadcrumb / Title area */}
            <div>
                <div className="text-base text-indigo-800 dark:text-gray-400 mb-2 ">
                    <span className="cursor-pointer hover:underline">Your Account</span>
                    <span className="mx-2">&gt;</span>
                    <span className="cursor-pointer hover:underline" onClick={() => navigate("/orders")}>Your Orders</span>
                    <span className="mx-2">&gt;</span>
                    <span className="text-orange-600 dark:text-gray-200 font-medium">Order Details</span>
                </div>
                <h1 className="text-4xl font-medium mt-3 ">Order Details</h1>
                <div className="flex items-center gap-5 mt-1 mb-1  justify-between">
                    <div className="flex gap-5">
                        <p className="text-base font-medium tracking-wider ">Order Placed {new Date(orderData.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-gray-300">|</p>
                        <p className="text-base font-medium tracking-wider">Order # {orderData.order_id}</p>
                    </div>
                    <p className="text-indigo-600 text-xl">Invoice <span className="text-black font-bold">⌵</span> </p>
                </div>
            </div>

            {/* Address & Payment Info Grid */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 grid md:grid-cols-3 gap-8 text-sm mb-8 shadow-sm">
                <div>
                    <h2 className="font-bold text-lg mb-2">Ship to</h2>
                    <p className="font-medium text-lg ">Pranshu Swami</p>
                    <p className="text-[17px] uppercase">
                        {orderData.house}, {orderData.street}<br />
                        {orderData.landmark && `${orderData.landmark}, `}{orderData.area}<br />
                        {orderData.district}, {orderData.state}<br />
                        {orderData.country}
                    </p>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Payment Method</h2>
                    <div className="flex text-lg items-center gap-2">
                        <p>Pay on Delivery</p>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Order Summary</h2>
                    <div className="space-y-1 ">
                        <div className="flex text-lg justify-between">
                            <span>Item(s) Subtotal:</span>
                            <span>₹{orderData.price}</span>
                        </div>
                        <div className="flex text-lg justify-between">
                            <span>Shipping & Handling:</span>
                            <span className="font-medium">Free Shipping</span>
                        </div>
                        <div className="flex text-lg justify-between">
                            <span>Cash/Pay on delivery fee:</span>
                            <span className="font-medium">No fee</span>
                        </div>
                        <div className="flex text-lg justify-between">
                            <span>Total:</span>
                            <span className="font-medium">₹{orderData.total_amount}</span>
                        </div>
                        <div className="flex text-lg justify-between">
                            <span>Promotion Applied:</span>
                            <span className="font-medium">none</span>
                        </div>
                        <div className="pt-2 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                            <span>Grand Total:</span>
                            <span className="">₹{orderData.total_amount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product List Segment */}
            <div className="space-y-4">
                {order.map((item) => (
                    <div
                        key={item.product_id || item.product_name}
                        className="border border-[#d5d9d9] rounded-lg overflow-hidden bg-white shadow-sm p-[18px]"
                    >
                        {item.order_status === "cancelled" || item.order_status === "Cancelled" ? (
                            /* --- CANCELLED VIEW --- */
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-[#0f1111]">Cancelled</h2>
                                <p className="text-sm text-[#0f1111] leading-relaxed max-w-2xl">
                                    If you were charged, a refund will be processed and credited to the original payment method within next 3-5 business days
                                </p>
                                <div className="pt-2 flex flex-col items-start gap-2">
                                    <span className="text-sm text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium">
                                        Amazon Pay balance: Credits
                                    </span>
                                    <div className="relative mt-2 w-14 h-10 border-[2.5px] border-[#333] rounded-md bg-white flex items-center justify-end pr-1.5 shadow-sm">
                                        <div className="w-4 h-5 border-2 border-l-0 border-[#333] bg-[#ffd814] rounded-r-sm absolute right-[-2.5px]"></div>
                                        <div className="w-2 h-2 rounded-full bg-[#333] z-10 mr-1"></div>
                                        <div className="absolute bottom-[-6px] left-[-6px] bg-white rounded-full p-0.5">
                                            <div className="w-5 h-5 rounded-full bg-[#4a6999] flex items-center justify-center text-white text-xs font-bold font-mono">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* --- ACTIVE / PENDING VIEW (Matches Orders view precisely) --- */
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold capitalize">
                                        Delivered 25 June
                                    </h2>
                                    <p className="text-lg text-black mt-0.5">Package was handed to resident</p>
                                    
                                    <div className="flex mt-4 text-xs text-gray-500 pt-3">
                                        <img className="h-34 w-34 object-contain" src={item.image_url} alt={item.product_name} />
                                        <div className="flex flex-col pl-4">
                                            <p className="text-lg line-clamp-3 text-cyan-800 font-medium">{item.description || item.product_name}</p>
                                            <p className="mt-0.5 text-base text-black">Sold by:XYZ</p>
                                            <p className="text-base text-black mt-0.5">Return window closed on 5 July 2026</p>
                                            
                                            <p className="text-base mt-0.5 text-black">₹{item.price}</p>
                                            <div className="flex mt-1 mb-2 gap-2">
                                                <button onClick={() => navigate(`/product/${item.product_id}`)}
                                                    className="w-35 bg-yellow-400 text-black px-2 py-1 rounded-full text-base font-medium shadow-sm border border-yellow-500 hover:bg-yellow-500">
                                                    <FiRotateCcw className="inline mr-1"/> Buy it Again
                                                </button>
                                                <button onClick={() => navigate(`/product/${item.product_id}`)}
                                                    className="w-35 text-base text-black border border-black px-2 py-1 rounded-full hover:bg-gray-50 font-medium">
                                                    View your item
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-75 flex flex-col gap-2">
                                   
                                    <button className="w-full text-center text-base bg-[#ffd814] hover:bg-[#f7ca00] text-black py-1.5 px-2 rounded-full border border-[#fcd200] shadow-sm font-medium">
                                        Get Product Support
                                    </button>
                                    <button className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium hover:bg-gray-50">
                                        Track Package
                                    </button>
                                    <button className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium hover:bg-gray-50">
                                        Ask Product Questions
                                    </button>
                                    <button className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium hover:bg-gray-50">
                                        Leave Seller Feedback
                                    </button>
                                    <button className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium hover:bg-gray-50">
                                        Leave Delivery Feedback
                                    </button>
                                    <button onClick={() => navigate(`/write-review/${item.product_id}`)}
                                        className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium hover:bg-gray-50"
                                    >
                                        Write a review
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetails;