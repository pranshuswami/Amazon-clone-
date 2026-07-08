import { Link, NavLink, useNavigate } from "react-router-dom";
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
        <nav className="sticky top-0 z-50 shrink-0 bg-[#131921] text-white shadow-md">


            <div className="flex min-h-[60px] max-w-full min-w-0 flex-wrap items-center gap-1 px-2 md:flex-nowrap md:gap-2 lg:px-3">


                <Link to="/" onClick={() => window.scrollTo(0,0)} className="order-2 flex h-[50px] shrink-0 items-center rounded-sm border border-transparent px-1 hover:border-white md:order-none md:w-[126px]">
                   

                    <div className="shrink-0">
                        <img 
                    className="h-9 w-[108px] object-contain md:hidden" 
                    
                    src={logo} />

                    <img 
                    className="hidden h-12 w-[118px] object-contain md:block" 
                    
                    src={logo1} />
                    </div>

                    
                </Link>

                <div onClick={()=>navigate(`/profile`)}
                className="hidden h-[50px] shrink-0 cursor-pointer items-center rounded-sm border border-transparent px-2 hover:border-white lg:flex">
                    <FiMapPin className="mt-3 text-lg" />
                    <div className="flex shrink-0 flex-col leading-tight">
                        <h2 className="text-xs text-gray-300">Deliver to Pranshu</h2>
                        <h2 className="text-sm font-bold">Bikaner 334001</h2>
                    </div>
                    </div>
                
                <div
                    className="relative order-4 flex h-10 w-full min-w-0 px-1 md:order-none md:flex-1 md:basis-0 md:px-0"
                >
                    
                    <button

                    onClick={()=>setShowCategory(!showCategory)}

                    className="hidden h-full shrink-0 items-center rounded-l-md border-r border-gray-300 bg-[#e6e6e6] px-3 text-sm text-[#111] hover:bg-[#d5d5d5] md:flex"

                    >

                        <span className="inline text-sm ">All  ⏷</span>

                    </button>

                    <input

                    type="text"

                    placeholder="Search Amazon.in"

                    value={keyword}

                    onChange={(e)=>setKeyword(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            handleSearch();
                        }
                    }}

                    className="h-full min-w-0 flex-1 bg-white px-3 text-[15px] text-black outline-none md:rounded-l-none"

                    />

                    <button

                    onClick={handleSearch}

                    className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center rounded-r-md bg-[#febd69] text-black hover:bg-[#f3a847] md:w-[52px]"

                    >

                        <IoSearch className="text-2xl" />


                    </button>

                    {

                    showCategory && (

                    <div

                    className="absolute left-1 top-11 z-50 w-60 rounded-sm bg-white p-3 text-black shadow-xl dark:bg-gray-800 dark:text-white md:left-0"

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

                <div className="hidden h-[50px] shrink-0 items-end gap-1 rounded-sm border border-transparent px-2 pb-2 hover:border-white lg:flex">
                    <img className="h-4 w-5 object-cover"
                    src="https://img.icons8.com/?size=96&id=32584&format=png" />
                    <h2 className="text-lg lg:text-base xl:text-sm items-center ml-1 font-bold">EN<span className="text-sm lg:text-xs text-gray-400">⏷</span></h2>
                </div>

                <div onClick={()=>navigate(`/profile`)}
                className="hidden h-[50px] shrink-0 cursor-pointer flex-col justify-center rounded-sm border border-transparent px-2 leading-tight hover:border-white xl:flex">
                    <h2 className="text-xs">Hello, Pranshu</h2>
                    <h2 className="lg:text-base text-lg font-bold">Account & Lists <span className="text-sm text-gray-400"> ⏷</span></h2>
                </div>

                <div onClick={()=>navigate(`/orders`)}
                className="hidden h-[50px] shrink-0 cursor-pointer flex-col justify-center rounded-sm border border-transparent px-2 leading-tight hover:border-white xl:flex">
                    <h2 className="text-xs">Returns</h2>
                    <h2 className="text-sm font-bold">& Orders</h2>
                </div>

                <img onClick={()=>navigate(`/cart`)}
                className="shrink-0 hidden md:block h-12 w-24 lg:h-10 lg:w-[5.5rem] xl:w-24 object-contain cursor-pointer"
                src={mdLogo} />

                <div className="order-3 flex-1 flex md:hidden justify-end gap-5 items-end overflow-hidden">

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
                    <h2 className="mt-3 pl-1 text-sm ">Deliver to Pranshu - Bikaner 334001 ⌵</h2>
                    </div>
                    {/* <div className="my-2 mr-2">
                        <button className="bg-blue-500 w-fit h-7 text-sm px-2 py-1 text-white rounded-full font-medium">Join Prime</button>
                    </div> */}
        </div>

        <div className="hidden h-12 lg:h-10  bg-gray-800 text-white px-2 py-2 md:flex justify-between">
            <div className="flex gap-7 lg:gap-5 ml-2.75 items-center">
            <h2 className="text-lg lg:text-sm font-bold"> <span className="text-2xl lg:text-lg font-normal">☰</span> All</h2>
            <img className="h-8 w-23 lg:h-6 lg:w-20 object-cover"
            src={rufus} />
            <h2 className="text-lg lg:text-sm">Fresh</h2>
            <h2 className="text-lg lg:text-sm">Keep shopping for</h2>
            <h2 className="text-lg lg:text-sm">Today's Deal</h2>
            <h2 className="text-lg lg:text-sm">Flight</h2>
            <h2 className="text-lg lg:text-sm">Buy Again</h2>
            <h2 className="hidden  text-lg lg:text-sm">Sports, Fitness & Outdoors</h2>
            <h2 className="hidden  text-lg lg:text-sm">MX Player</h2>
            <h2 className="hidden  text-lg lg:text-sm">Sell</h2>
            <h2 className="hidden  text-lg lg:text-sm">Gift Cards</h2>
            <h2 className="hidden  text-lg lg:text-sm">Amazon Pay</h2>
            <h2 className="hidden  text-lg lg:text-sm">Gift Ideas</h2>
            <h2 className="hidden  text-lg lg:text-sm">Browsing History</h2>
            <h2 className="hidden  text-lg lg:text-sm">Subscribe & Save</h2>
            <h2 className="hidden md:block text-lg lg:text-sm">Pranshu's Amazon.in</h2>
            </div>
            <img className="h-10 w-120 lg:hidden lg:w-130 lg:mt-0 -mt-1 pb-0.5"
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
