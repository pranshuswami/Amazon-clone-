import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCheckmark, IoSearch } from "react-icons/io5";
import { FiRotateCcw } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2026");
  const navigate = useNavigate();

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // Helper to cleanly format dates to match Amazon style (e.g., "25 June 2026")
  const formatAmazonDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <>
    <div className="hidden md:block min-h-screen bg-white text-[#0f1111] antialiased px-4 py-2 md:px-16 ">
      
      <div className="hidden md:block max-w-[1150px] mx-auto">
        
        <nav className="hidden text-gray-600 mb-4 md:flex items-center gap-1.5">
          <span className="hover:text-gray-700 hover:underline cursor-pointer text-lg ">Your Account</span>
          <span className="text-gray-400 text-xl">&gt;</span>
          <span className="text-[#c45500] text-lg">Your Orders</span>
        </nav>

        <div className="hidden md:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
          <h1 className="text-4xl font-medium text-black">Your Orders</h1>
          
          <div className="flex items-center gap-2 md:w-140 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <IoSearch className="absolute inset-y-0 top-2 text-xl font-bold left-3 flex items-center text-black" />
              <input
                type="text"
                placeholder="Search all orders"
                className="w-full pl-9 pr-3 py-1 text-lg border border-gray-400 rounded-lg focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
              />
            </div>
            <button className="bg-gray-950 text-white text-base font-bold px-5 py-2 rounded-full whitespace-nowrap shadow-sm">
              Search Orders
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12 leading-loose border-b border-gray-300 text-lg pl-8 mt-7 mb-4">
          <div className="border-b-[2px] border-[#e47911] pb-1 font-medium cursor-pointer text-[#0f1111]">
            Orders
          </div>
          <div className="pb-1 text-[#007185] hover:text-black hover:underline cursor-pointer">
            Buy Again
          </div>
          <div className="pb-1 text-[#007185] hover:text-black hover:underline cursor-pointer">
            Not Yet Shipped
          </div>
        </div>

        {/* --- TIMELINE FILTER BAR --- */}
        <div className="text-lg mb-4 hidden md:flex items-center gap-1.5">
          <span className="font-semibold">{orders.length} orders</span> placed in
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className=" border border-gray-300 rounded-md px-2 py-1.5 text-lg font-medium cursor-pointer hover:bg-[#e3e6e6] focus:outline-none"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* --- ORDERS LIST CONTAINER --- */}
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">Loading your order details...</div>
        ) : orders.length === 0 ? (
          <div className="border border-[#d5d9d9] rounded-lg p-6 text-center text-sm text-gray-600">
            No orders found matching this period.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="border border-[#d5d9d9] rounded-lg overflow-hidden bg-white shadow-sm"
              >
                {/* --- CARD HEADER --- */}
                <div className="bg-[#f0f2f2] hidden border-b border-[#d5d9d9] px-[18px] py-3 md:flex flex-wrap justify-between items-center text-base gap-y-2">
                  <div className="flex gap-15">
                    <div className="leading-tight">
                      <p className="text-[#565959] uppercase tracking-wide ">Order Placed</p>
                      <p className="text-[#565959]  mt-0.5 text-lg">
                        {formatAmazonDate(order.created_at)}
                      </p>
                    </div>
                    <div className="leading-tight">
                      <p className="text-[#565959] uppercase tracking-wide ">Total</p>
                      <p className="text-[#565959]  mt-0.5 text-lg">₹{order.total_amount}</p>
                    </div>
                    <div className="leading-tight">
                      <p className="text-[#565959] uppercase tracking-wide ">Ship to:</p>
                      <span className="text-cyan-700 mt-0.5 text-lg">Pranshu Swami <span classname="text-xl text-black font-bold">⌵</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <p className="text-[#565959] uppercase tracking-wide text-base">
                        Order # {order.order_id}
                      </p>
                    </div>
                    <p onClick={() => navigate(`/order/${order.order_id}`)} className="text-cyan-700 cursor-pointer">View Order Details<span className="text-gray-300"> | </span>  Invoice <span className="text-black font-bold text-lg">⌵</span></p>
                  </div>
                </div>

                {/* --- CARD BODY --- */}
                <div className="p-[18px]">
                  {order.order_status === "cancelled" || order.order_status === "Cancelled" ? (
                    /* --- CANCELLED VIEW (Matches image example) --- */
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-[#0f1111]">Cancelled</h2>
                      <p className="text-sm text-[#0f1111] leading-relaxed max-w-2xl">
                        If you were charged, a refund will be processed and credited to the original payment method within next 3-5 business days
                      </p>
                      <div className="pt-2 flex flex-col items-start gap-2">
                        <span className="text-sm text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer font-medium">
                          Amazon Pay balance: Credits
                        </span>
                        {/* Wallet graphic mockup component */}
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
                    /* --- ACTIVE / PENDING VIEW --- */
                    <div className="hidden md:flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold capitalize">
                          Delivered 25 June
                        </h2>
                        <p className="text-lg font-medium text-gray-00 mt-1">Package was handed to resident</p>
                        
                        <div className="flex mt-4 text-xs text-gray-500 pt-3">
                          <img className="h-34 w-34 object-contain"
                          src={order.image_url}/>
                          <div className="flex flex-col">
                            <p className="text-lg line-clamp-3 text-cyan-800">{order.description}</p>
                          <p className="text-base text-black mt-2">Return window closed on 5 July 2026</p>
                          <div className="flex mt-1 gap-2">
                            <button onClick={() => navigate(`/product/${order.product_id}`)}
                            className="w-35 bg-yellow-400 text-black px-2 py-1 rounded-full text-base"><FiRotateCcw className="inline"/> Buy it Again</button>
                            <button onClick={() => navigate(`/product/${order.product_id}`)}
                            className=" w-35 text-base text-black border border-black px-2 py-1 rounded-full">View your item</button>
                          </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-75 flex flex-col gap-2">
                        <button
                          
                          className="w-full text-center text-base bg-[#ffd814] hover:bg-[#f7ca00] text-black py-1.5 px-2 rounded-full border border-[#fcd200] shadow-sm font-medium"
                        >
                          Get Product Support
                        </button>
                        <button
                         className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium"
                        >
                          Track Package
                        </button>
                        <button
                         className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium"
                        >
                          Ask Product Questions
                        </button>
                        <button
                         className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium"
                        >
                          Leave Seller Feedback
                        </button>
                        <button
                         className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium"
                        >
                          Leave Delivery Feedback
                        </button>
                        <button onClick={() => navigate(`/write-review/${order.product_id}`)}
                         className="w-full text-center text-base text-black py-1.5 px-2 rounded-full border border-gray-500 font-medium"
                        >
                          Write a review
                        </button>
                        
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>




    <div className="md:hidden min-h-screen bg-gray-300 text-[#0f1111] antialiased  md:px-16 ">
        {orders.map((order) => (
    <div key={order.order_id}>
       <div className="md:hidden px-2 py-4.5 bg-white ">
        <div className="p-3 flex items-center gap-2">
            <img className="h-35 w-35 object-contain"
            src="https://i.pinimg.com/736x/cc/2d/92/cc2d92241e3acc4d4a570e4b52746fb8.jpg" />
            <p className="text-cyan-700 line-clamp-2">Samsung Galaxy S26 5G features a compact...</p>
        </div>
        <div className="border-t border-b mt-2 border-gray-300 flex justify-between items-center
        ">
            <button className=" w-full text-start ">Buy it again</button>
        <p className="text-4xl font-medium pb-2">›</p>
        </div>
       
      </div>
      <div className="bg-white mt-1.5 p-4">
       <div className="flex gap-2">
          <div className="w-6 h-6 bg-[#4DB6AC] flex items-center justify-center mt-1">
        <IoCheckmark className="text-white text-[23px] font-extrabold" />
    </div>
        <p className="text-lg font-bold leading-tight mt-1.25">Delivered 25 june<br />
            <span className="text-gray-500 font-normal text-base">Package handed to resident</span>
        </p>
       </div>
       <div className="border border-gray-300 rounded-lg px-3 py-2 flex flex-col gap-1.5 mt-2">
        <p className="text-base">Your delivery Feedback</p>
        <div className=" flex ">
            <FaStar className="text-orange-500 text-lg" /><FaRegStar className="text-orange-500 text-lg" /><FaRegStar className="text-orange-500 text-lg" /><FaRegStar className="text-orange-500 text-lg" /><FaRegStar className="text-orange-500 text-lg" />
        </div>
       
       </div>
       <div className="mt-2 border-b border-gray-200 px-3 flex items-center justify-between">
            <p className="text-base">Track Package</p>
            <p className="text-4xl font-medium pb-2">›</p>
        </div>
        
      </div>
      <div className="bg-white px-3 py-2 mt-2">
            <h2 className="text-lg font-bold">Need help with your item?</h2>
            <div className="flex items-center justify-between px-3 py-1 my-3 border-t border-b border-gray-300">
                <p className="text-base">Get Product Support</p>
                <p className="text-4xl font-medium pb-2">›</p>
            </div>
        </div>

        <div className="bg-white px-3 py-2 mt-2">
            <h2 className="text-lg font-bold">How's your item?</h2>
            <div className="flex items-center justify-between px-3 py-1 mt-3 border-t border-b border-gray-300">
                <p onClick={() => navigate(`/write-review/${order.product_id}`)} className="text-base">Write a Review</p>
                <p className="text-4xl font-medium pb-2">›</p>
            </div>
            <div className="flex items-center justify-between px-3 py-1 border-t border-b border-gray-300">
                <p className="text-base">Leave seller feedback</p>
                <p className="text-4xl font-medium pb-2">›</p>
            </div>
        </div>

        <div className="bg-white px-3 py-2 mt-2">
            <h2 className="text-lg font-bold">Order Info</h2>
            <div className="flex items-center justify-between px-3 py-1 mt-3 border-t border-b border-gray-300">
                <p onClick={() => navigate(`/order/${order.order_id}`)} className="text-base">View order details</p>
                <p className="text-4xl font-medium pb-2">›</p>
            </div>
            <div className="flex items-center justify-between px-3 py-1 border-t border-b border-gray-300">
                <p className="text-base">Download invoice</p>
                <p className="text-4xl font-medium pb-2">›</p>
            </div>
            <p className="text-gray-600 mt-3 text-base">Return window closed on 5 July 2026</p>
            <p className="text-gray-600 mt-1.5 text-base">Ordered on 23 June 2026</p>
        </div>
    </div>
))}
    </div>
    </>
  );
};

export default Orders;