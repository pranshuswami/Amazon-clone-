import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-white text-[#0f1111] antialiased px-4 py-2 md:px-16 ">
      <div className="max-w-[1150px] mx-auto">
        
        <nav className="text-gray-600 mb-4 flex items-center gap-1.5">
          <span className="hover:text-gray-700 hover:underline cursor-pointer text-lg ">Your Account</span>
          <span className="text-gray-400 text-xl">&gt;</span>
          <span className="text-[#c45500] text-lg">Your Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
          <h1 className="text-4xl font-medium text-black">Your Orders</h1>
          
          <div className="flex items-center gap-2 max-w-md w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search all orders"
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-400 rounded-md focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
              />
            </div>
            <button className="bg-[#111] hover:bg-[#222] text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap shadow-sm">
              Search Orders
            </button>
          </div>
        </div>

        {/* --- SUB-NAVIGATION TABS --- */}
        <div className="flex items-center gap-6 border-b border-gray-300 text-sm mb-4">
          <div className="border-b-[2px] border-[#e47911] pb-2 font-medium cursor-pointer text-[#0f1111]">
            Orders
          </div>
          <div className="pb-2 text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">
            Buy Again
          </div>
          <div className="pb-2 text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">
            Not Yet Shipped
          </div>
        </div>

        {/* --- TIMELINE FILTER BAR --- */}
        <div className="text-sm mb-4 flex items-center gap-1.5">
          <span className="font-bold">{orders.length} orders</span> placed in
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[#f0f2f2] border border-gray-300 rounded-md px-3 py-1 text-xs font-medium shadow-sm cursor-pointer hover:bg-[#e3e6e6] focus:outline-none"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* --- ORDERS LIST CONTAINER --- */}
        {loading ? (
          <div className="text-center py-12 text-sm text-gray-500">Loading your order details...</div>
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
                <div className="bg-[#f0f2f2] border-b border-[#d5d9d9] px-[18px] py-3 flex flex-wrap justify-between items-center text-xs gap-y-2">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[#565959] uppercase tracking-wide text-[11px]">Order Placed</p>
                      <p className="text-[#565959] font-medium mt-0.5">
                        {formatAmazonDate(order.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#565959] uppercase tracking-wide text-[11px]">Total</p>
                      <p className="text-[#565959] font-medium mt-0.5">₹{order.total_amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#565959] uppercase tracking-wide text-[11px]">
                      Order # {order.order_id || "403-9461362-7919519"}
                    </p>
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
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <h2 className="text-base font-bold text-green-700 capitalize">
                          {order.order_status}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">Arriving Thursday</p>
                        
                        <div className="mt-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
                          <p className="font-semibold text-gray-700">Ship to:</p>
                          <p className="mt-0.5">
                            {order.house}, {order.street}, {order.area}, {order.state}
                          </p>
                        </div>
                      </div>

                      <div className="w-full md:w-auto flex flex-col gap-2 min-w-[160px]">
                        <button
                          onClick={() => navigate(`/order/${order.order_id}`)}
                          className="w-full text-center text-xs bg-[#ffd814] hover:bg-[#f7ca00] text-black py-1.5 px-3 rounded-md border border-[#fcd200] shadow-sm font-normal"
                        >
                          View order details
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
  );
};

export default Orders;