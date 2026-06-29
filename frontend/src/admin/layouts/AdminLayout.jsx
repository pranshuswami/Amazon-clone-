import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {

    return (

        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

            <AdminSidebar />

            <div className="flex-1 ml-64">

                <AdminNavbar />

                <main className="p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;y