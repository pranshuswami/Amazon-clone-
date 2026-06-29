import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";
import SearchPage from "./pages/SearchPage";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
// import Profile from "./pages/Profile";

const App = () => {


    const token = localStorage.getItem("token");


    return (

        <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white">


             <Navbar />     


            <Routes>


                <Route
                path="/login"
                element={<Login />}
                />


                <Route
                path="/register"
                element={<Register />}
                />


                <Route
                  path="/"
                  element={<Home />}
                />
                <Route

                path="/search/:keyword"
                element={<SearchPage />}
                />

                <Route

                  path="/products/:slug"

                  element={<CategoryPage />}

                />
                  <Route 
                    path="/product/:id" 
                    element={<ProductDetails />}
                  />


                <Route
                path="/cart"
                element={
                    token
                    ?
                    <Cart />
                    :
                    <Navigate to="/login" />
                }
                />


                <Route
                path="/checkout"
                element={
                    token
                    ?
                    <Checkout />
                    :
                    <Navigate to="/login" />
                }
                />
                <Route 
                  path="/payment" 
                  element={<Payment />} 
                />


                <Route
                path="/orders"
                element={
                    token
                    ?
                    <Orders />
                    :
                    <Navigate to="/login" />
                }
                />


                <Route
                path="/order/:id"
                element={
                    token
                    ?
                    <OrderDetails />
                    :
                    <Navigate to="/login" />
                }
                />
                {/* <Route
                path="/profile"
                element={<Profile />}
                /> */}


            </Routes>
            <Footer />

        </div>

    );

};


export default App;