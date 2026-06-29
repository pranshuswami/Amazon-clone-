import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    return (

        <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white shadow-xl">

            <div className="p-6">

                <h1 className="text-2xl font-bold">

                    Admin Panel

                </h1>

            </div>

            <nav className="flex flex-col">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    🏠 Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    📦 Products
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    📂 Categories
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    🛒 Orders
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    👤 Users
                </NavLink>

                <NavLink
                    to="/admin/reviews"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    ⭐ Reviews
                </NavLink>

                <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    📊 Analytics
                </NavLink>

                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) =>
                        `px-6 py-4 hover:bg-gray-800 ${
                            isActive ? "bg-yellow-500 text-black font-bold" : ""
                        }`
                    }
                >
                    ⚙️ Settings
                </NavLink>

            </nav>

        </div>

    );

};

export default AdminSidebar;