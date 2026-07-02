import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/Amazon logo.png"
import { FiLogOut,FiLogIn,FiUser, FiMoon,FiShoppingCart,FiPackage,FiHome,FiHeart,FiMapPin,FiSearch } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import cart from "../assets/cart.png"
import user from "../assets/user.png"



const Navbar = () => {


    const [keyword, setKeyword] = useState("");

    const [cartCount, setCartCount] = useState(0);

    const [showCategory, setShowCategory] = useState(false);

    const [categories, setCategories] = useState([]);

    const [showMenu, setShowMenu] = useState(false);


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
        <nav className="bg-gray-800 text-white py-1 sticky top-0 z-50 shadow-lg">


            <div className="flex flex-wrap items-center gap-3 w-full">


                <Link to="/" className="order-2 md:order-none -ml-2 lg:ml-0 lg:mb-0 mt-1 -mb-1.75">
                   

                    <img 
                    onClick={window.scrollTo(0,0)}
                    className="h-8 md:h-14 w-27  md:w-36 object-contain" 
                    
                    src={logo} />

                    
                </Link>
                
                <div className="relative order-4 md:order-none px-2 lg:border-none border-t border-gray-400 h-11 flex w-full md:w-[45%] min-w-0"
                >
                    
                    <button

                    onClick={()=>setShowCategory(!showCategory)}

                    className="bg-gray-600 hidden text-white px-4 rounded-l-md  font-semibold lg:flex items-center gap-2"

                    >

                        <span className="text-sm">☰ All</span>

                    </button>

                    <input

                    type="text"

                    placeholder="Search Product..."

                    value={keyword}

                    onChange={(e)=>setKeyword(e.target.value)}

                    className="w-full px-3 py-2 md:py-3 rounded-r-lg rounded-l-lg lg:rounded-l-none bg-white text-black "

                    />

                    <button

                    onClick={handleSearch}

                    className="absolute bottom-0 right-0 top-0 mr-2 bg-orange-300 px-2.5 w-12 md:px-6 rounded-l-lg rounded-r-lg text-black hover:bg-amber-500 cursor-pointer"

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

                <div className="order-3 flex-1 flex justify-end gap-5 items-end overflow-hidden">

                    <NavLink

                    to="/"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold flex items-center gap-2 whitespace-nowrap"

                    :

                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"

                    }

                    >
                    <FiHome className="hidden lg:block text-2xl"/>
                    <span className="hidden md:block">
                        Home
                    </span>

                    </NavLink>

                    <NavLink className=                   

                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"
                    
                    >
                        <span className="lg:hidden text-sm font-medium">
                            Pranshu<span className="tetx-xs -mr-2">{" >"}</span>
                        </span>
                        <FiUser className="hidden text-3xl -mr-2"/>
                        <img className="lg:hidden h-8 w-8 ml-0.5 -mr-3"src={user} />
                    </NavLink>

                    <NavLink

                    to="/cart"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold flex items-center gap-2 whitespace-nowrap"

                    :

                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"

                    }

                    >
                    <FiShoppingCart className="hidden md:block text-2xl"/>
                    <span className="hidden md:block">Cart ({cartCount})</span>
                    <img className="lg:hidden h-8 w-12  -mb-1 -mr-1.5"src={cart} />

                    </NavLink>

                    <NavLink

                    to="/orders"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold flex items-center gap-2 whitespace-nowrap"

                    :

                    "dark:text-white font-medium flex items-center gap-2 whitespace-nowrap"

                    }

                    >
                    <FiPackage className=" hidden md:block text-2xl"/>
                    <span className="hidden md:block">
                        Orders
                    </span>

                    </NavLink>

                    

                </div>

                <div className="order-1 ml-2 lg:ml-90 relative"
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
        <div className="lg:hidden bg-[#37475A] text-white flex justify-between pl-3  h-11">
                    <div className="flex">
                        <FiMapPin className="mt-3.5 text-xl" />
                    <h2 className="mt-3 pl-1 text-sm ">Deliver to 334001 ⌵</h2>
                    </div>
                    <div className="my-2 mr-2">
                        <button className="bg-blue-500 w-fit h-7 text-sm px-2 py-1 text-white rounded-full font-medium">Join Prime</button>
                    </div>
            </div>
        </>
    );

};

export default Navbar;