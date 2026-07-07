import { Link, NavLink, useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/Amazon logo.png"
import logo1 from "../assets/md amazon.png"
import mdLogo from "../assets/md cart.png"
import { FiLogOut,FiLogIn,FiUser, FiMoon,FiShoppingCart,FiPackage,FiHome,FiHeart,FiMapPin,FiSearch } from "react-icons/fi";
import { IoMenu, IoSearch } from "react-icons/io5";
import cart from "../assets/cart.png"
import user from "../assets/user.png"
import prime_logo from "../assets/primeday logo.png"
import rufus from "../assets/rufus.png"
import { FaStripe, FaStripeS } from "react-icons/fa";


const Navbar = () => {


    const [keyword, setKeyword] = useState("");

    const [cartCount, setCartCount] = useState(0);

    const [showCategory, setShowCategory] = useState(false);

    const [categories, setCategories] = useState([]);

    const [showMenu, setShowMenu] = useState(false);

    const [showSideMenu, setShowSideMenu] = useState(false);


    const [token, setToken] = useState(
        localStorage.getItem("token")
    );


    const navigate = useNavigate();
    const location = useLocation();

    const showCartSidebar =
        location.pathname.startsWith("/products/") ||
        location.pathname.startsWith("/search/") ||
        location.pathname.startsWith("/product/") ||
        location.pathname.startsWith("/write-review/")


    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );


    useEffect(() => {

        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );


        localStorage.setItem(
            "theme",
            theme
        );


    }, [theme]);



    useEffect(() => {


        getCartCount();

        getCategories();


        window.addEventListener(
            "storage",
            getCartCount
        );


        return () => {


            window.removeEventListener(
                "storage",
                getCartCount
            );


        };


    }, [token]);




    const getCategories = async()=>{

        try{


            const res = await axios.get(
                "http://localhost:5000/categories"
            );


            setCategories(res.data.data);


        }
        catch(error){

            console.log(error);

        }

    };




    const getCartCount = async () => {

        try {


            const res = await axios.get(
                "http://localhost:5000/cart/count",
                {
                    headers: {

                        Authorization:

                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            setCartCount(res.data.count);


        }
        catch (error) {

            console.log(error);

        }

    };



    const handleSearch = () => {


        navigate(`/search/${keyword}`);


    };



    const logout = () => {


        localStorage.removeItem("token");


        setToken(null);


        navigate("/login");


        setCartCount(0);


    };



    return (

        <>
        <nav className="bg-gray-800 md:bg-gray-900 md:h-19 text-white md:py-2 py-1 sticky top-0 z-50 shadow-lg  ">


            <div className="flex flex-wrap items-center gap-3 w-full">


                <Link to="/" className="order-2 md:order-none -ml-2 md:ml-0 md:mb-0 mt-1 md:-mt-1 -mb-1.75">
                   

                    <img 
                    onClick={window.scrollTo(0,0)}
                    className="md:hidden h-8 md:h-14 w-27  md:ml-3 md:w-40 object-contain" 
                    
                    src={logo} />

                    <img 
                    onClick={window.scrollTo(0,0)}
                    className="hidden md:block h-8 md:h-16 w-27  md:ml-2 md:w-42 object-contain" 
                    
                    src={logo1} />

                    
                </Link>

                <div className="hidden md:flex items-center mb-2 pl-0.5">
                    <FiMapPin className="mt-4.5 text-xl" />
                    <div className=" flex flex-col gap-0 pt-2">
                        <h2 className=" pl-1 text-base text-gray-200 -mb-2">Deliver to Pranshu</h2>
                        <h2 className=" pl-1 text-lg font-bold">Bikaner 334001</h2>
                    </div>
                    </div>
                
                <div
                    className={`relative order-4 md:order-none px-2 md:border-none border-t border-gray-400 h-11 flex w-full min-w-0 md:h-12.5 transition-all duration-300 ${
                        showCartSidebar
                            ? "md:w-[41%]"
                            : "md:w-[47%]"
                    }`}
                >
                    
                    <button

                    onClick={()=>setShowCategory(!showCategory)}

                    className="bg-mauve-200 hidden text-gray-600 px-3 rounded-l-md font-medium md:flex items-center w-1/8 border-r border-gray-300"

                    >

                        <span className="inline text-sm ">All  ⏷</span>

                    </button>

                    <input

                    type="text"

                    placeholder="Search Product..."

                    value={keyword}

                    onChange={(e)=>setKeyword(e.target.value)}

                    className="w-full px-3 py-2 md:py-3 rounded-r-lg rounded-l-lg md:rounded-l-none bg-white text-black "

                    />

                    <button

                    onClick={handleSearch}

                    className="absolute bottom-0 right-0 top-0 mr-2 bg-orange-300 pl-2 px-2.6 w-12 md:px-3 rounded-l-lg md:rounded-l-none rounded-r-lg text-black hover:bg-amber-500 cursor-pointer md:w-14"

                    >

                        <IoSearch className="text-3xl font-extrabold" />


                    </button>

                    {

                    showCategory && (

                    <div

                    className="absolute top-30 lg:top-14 left-0 bg-white dark:bg-gray-800 text-black dark:text-white w-60 shadow-xl rounded-lg p-3 z-50"

                    >

                    {


                    categories.map((category)=>(

                    <p

                    key={category.category_id}


                    onClick={()=>{

                        navigate(`/products/${category.slug}`);

                        setShowCategory(false);

                    }}


                    className="cursor-pointer px-3 py-2 hover:bg-yellow-400 hover:text-black rounded"

                    >

                        {category.category_name}


                    </p>


                    ))


                    }

                    </div>

                    )

                    }

                </div>

                <div className="hidden md:flex items-center pt-5 pb-2 ml-1">
                    <img className="h-7 w-8 object-contain"
                    src="https://img.icons8.com/?size=96&id=32584&format=png" />
                    <h2 className="text-lg items-center ml-1 font-bold">EN<span className="text-sm text-gray-400">⏷</span></h2>
                </div>

                <div onClick={()=>navigate(`/profile`)}
                className="hidden md:flex flex-col my-1 ml-1 cursor-pointer">
                    <h2 className="text-base -mb-2">Hello, Pranshu</h2>
                    <h2 className="text-lg font-bold">Account & Lists <span className="text-sm text-gray-400"> ⏷</span></h2>
                </div>

                <div onClick={()=>navigate(`/orders`)}
                className="hidden md:flex flex-col my-1 ml-1 cursor-pointer">
                    <h2 className="text-base -mb-2">Returns</h2>
                    <h2 className="text-lg font-bold">& Orders</h2>
                </div>

                <img className="hidden md:block h-12 w-26 -mr-50 object-contain"
                src={mdLogo} />

                <div className="order-3 flex-1 flex justify-end gap-5 items-end overflow-hidden">

                    {/* <NavLink

                    to="/"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold flex items-center gap-2 whitespace-nowrap"

                    :

                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"

                    }

                    >
                    <FiHome className="hidden text-2xl"/>
                    <span className="hidden">
                        Home
                    </span>

                    </NavLink> */}

                    <NavLink  onClick={() => setShowSideMenu(true)}
                    className=                   
                      
                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"
                    
                    >
                        <span className="lg:hidden text-sm font-medium">
                            Pranshu<span className="tetx-xs -mr-2">{" >"}</span>
                        </span>
                        <FiUser className="hidden text-3xl -mr-2"/>
                        <img className="lg:hidden h-8 w-8 ml-0.5 -mr-3" src={user} />
                    </NavLink>

                    <Link

                    to="/cart"

                    className="dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"

                    

                    >
                    <FiShoppingCart className="hidden text-2xl"/>
                    <span className="hidden">Cart ({cartCount})</span>
                    <img className="lg:hidden h-8 w-12  -mb-1 -mr-1.5 cursor-pointer"src={cart} />

                    </Link>

                    {/* <NavLink

                    to="/orders"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold flex items-center gap-2 whitespace-nowrap"

                    :

                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"

                    }

                    >
                    <FiPackage className=" hidden text-2xl"/>
                    <span className="hidden md:block">
                        Orders
                    </span>

                    </NavLink> */}

                    

                </div>

                <div className="md:hidden order-1 ml-2 lg:ml-90 relative"
                onMouseEnter={()=>setShowMenu(true)}
                onMouseLeave={()=>setShowMenu(false)}>

                    <button onClick={()=>setShowMenu(!showMenu)}
                      className="text-2xl  cursor-pointer">
                        ☰
                      </button>
                    {
                        showMenu &&  (
                            <div className="absolute left-0 lg:right-0 top-8 w-56 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-3 z-50">
                                <button
                                onClick={()=>{

                                    navigate("/profile");

                                    setShowMenu(false);

                       }}

                                className="w-full flex items-center gap-3 whitespace-nowrap px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium rounded">
                                   <>
                                    <FiUser/>
                                    My Profile
                                    </>
                                </button>

                                {/* <button

                                    onClick={()=>{

                                    navigate("/wishlist");

                                    setShowMenu(false);

                                }}

                                    className="w-full flex items-center gap-3 whitespace-nowrap px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium rounded"

                                >

                                <>

                                    <FiHeart/>

                                    My Wishlist

                                </>

                                </button> */}

                                <button

                                    onClick={()=>{

                                        setTheme(

                                        theme==="dark"

                                            ?

                                        "light"

                                            :

                                        "dark"

                                        );

                                    setShowMenu(false);

                                }}

                                    className="w-full flex items-center gap-3 whitespace-nowrap px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium  rounded"

                                >

                                <>
                                <FiMoon />
                                Theme
                                </>

                                </button>

                                <button

                                    onClick={()=>{

                                if(token){

                                    logout();

                                }
                                else{

                                    navigate("/login");

                                }

                            }}

                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-400 dark:hover:bg-red-400 font-medium rounded"

                            >

                            {

                                token

                                    ?

                                <>

                                    <FiLogOut/>

                                    Logout

                                </>

                                    :

                                <>

                                    <FiLogIn/>

                                    Login

                                </>

                            }


                            </button>
                                
                            </div>
                        )
                    }

                </div>

            </div>
            

        </nav>
        <div className="md:hidden bg-[#37475A] text-white flex justify-between pl-3  h-11">
                    <div className="flex">
                        <FiMapPin className="mt-3.5 text-xl" />
                    <h2 className="mt-3 pl-1 text-sm ">Deliver to 334001 ⌵</h2>
                    </div>
                    <div className="my-2 mr-2">
                        <button className="bg-blue-500 w-fit h-7 text-sm px-2 py-1 text-white rounded-full font-medium">Join Prime</button>
                    </div>
        </div>

        <div className="hidden h-12 bg-gray-800 text-white px-2 py-2 md:flex justify-between">
            <div className="flex gap-7 ml-2.75 items-center">
            <h2 className="text-lg font-bold"> <span className="text-2xl font-normal">☰</span> All</h2>
            <img className="h-8 w-23 object-cover"
            src={rufus} />
            <h2 className="text-lg">Fresh</h2>
            <h2 className="text-lg">Keep shopping for</h2>
            <h2 className="text-lg">Today's Deal</h2>
            <h2 className="text-lg">Flight</h2>
            <h2 className="text-lg">Buy Again</h2>
            </div>
            <img className="h-10 w-120 -mt-1 pb-0.5"
            src ={prime_logo} />
        </div>
        {/* Background */}

{showSideMenu && (

<div
    onClick={() => setShowSideMenu(false)}
    className="fixed inset-0 bg-black/60 z-[100]"
>

    {/* Sidebar */}

    <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px]
        bg-white transition-transform duration-300
        ${showSideMenu ? "translate-x-0" : "-translate-x-full"}
        overflow-y-auto`}
    >
        


        {/* Header */}

             <p className="bg-gray-800 -mb-2 pt-3 pr-4 text-end text-white text-base">Browser <IoMenu size={25} className="inline" /></p>
        <div className="bg-gray-800 text-white p-5 h-15 flex  items-center justify-between">
               
            <div className="flex  items-end-safe gap-3 ">

                <h2 className="font-bold text-xl">
                    Hello, Pranshu
                </h2>

            </div>

            <button
                onClick={() => setShowSideMenu(false)}
                className="text-3xl"
            >
                ✕
            </button>

        </div>

        {/* Profile */}

        <div className="p-5 border-b-5 border-gray-300">

            <div className="flex justify-between">

                <h2 className="font-bold text-xl">
                    Profile
                </h2>

                <button className="text-cyan-600 border border-cyan-600 px-1 py-0.5 rounded-md">
                    See All
                </button>

            </div>

            <p onClick={()=>{ setShowSideMenu(false);    navigate(`/profile`); }}
            className="mt-3 text-[17px] leading-tight cursor-pointer">
               Pranshu Swami<br />
               <span className="text-gray-500 text-sm ">Account Holder</span>
            </p>
            <hr className="border border-gray-300 mt-8" />

            <div className="mt-3 space-y-5">

                <p onClick={()=>{setShowSideMenu(false);  navigate(`/login`)}}
                className="cursor-pointer">Switch Accounts</p>

                <p onClick={()=>{setShowSideMenu(false);  navigate(`/login`)}}
                className="cursor-pointer">Sign Out</p>

            </div>

        </div>

        {/* Orders */}

        <div className="p-5 border-b-5 border-gray-300">

            <div className="flex justify-between">

                <h2 
                className="font-bold text-xl ">
                    Your Orders
                </h2>

                <button className="text-cyan-600 border border-cyan-600  px-1 py-0.5 rounded-md">
                    See All
                </button>

            </div>

            <div className="space-y-8 mt-5">

                <p onClick={()=>{setShowSideMenu(false); navigate(`/orders`)}}
                className="cursor-pointer">Track and Manage Your Orders</p>

                <p>Buy Again</p>

                <p>Your Returns</p>

                <p>Delivery Speeds & Charges</p>

                <p>Customer Service</p>

            </div>

        </div>

        {/* Account */}

        <div className="p-5">

            <div className="flex justify-between">

                <h2 className="font-bold text-xl">
                    Your Account
                </h2>

                <button className="text-cyan-600 border border-cyan-600  px-1 py-0.5 rounded-md">
                    See All
                </button>

            </div>

            <div className="space-y-8 mt-5">

                <p>Lists</p>

                <p>Recommendations</p>

                <p>Browsing History</p>

                <p>Subscribe & Save</p>

                <p>Your Prime Membership</p>

                <p>Your Payments</p>

                <p>Your Addresses</p>

                <p>Settings</p>

            </div>

        </div>

    </div>

</div>

)}
        </>
        
    );

};

export default Navbar;