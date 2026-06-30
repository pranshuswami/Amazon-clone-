import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/Amazon Clone logo.png"
import { FiLogOut,FiLogIn,FiUser, FiMoon,FiShoppingCart,FiPackage,FiHome,FiHeart} from "react-icons/fi";

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


        <nav className="bg-gray-900 text-white px-6 py-3 sticky top-0 z-50 shadow-lg">


            <div className="flex items-center justify-between">


                <Link to="/">
                   

                    <img 
                    onClick={window.scrollTo(0,0)}
                    className="h-14 w-36 object-contain" 
                    
                    src={logo} />

                    
                </Link>

                <div className="flex w-[50%] relative"
                >

                    <button

                    onClick={()=>setShowCategory(!showCategory)}

                    className="bg-gray-700 text-white px-4 rounded-l-md font-semibold flex items-center gap-2"

                    >

                        ☰ All

                    </button>

                    <input

                    type="text"

                    placeholder="Search Product..."

                    value={keyword}

                    onChange={(e)=>setKeyword(e.target.value)}

                    className="w-full px-4 py-3 bg-white text-black outline-none"

                    />

                    <button

                    onClick={handleSearch}

                    className="bg-yellow-400 px-6 rounded-r-md text-black hover:bg-yellow-500 cursor-pointer"

                    >

                        <span className="text-3xl">

                            🔍

                        </span>


                    </button>

                    {

                    showCategory && (

                    <div

                    className="absolute top-14 left-0 bg-white dark:bg-gray-800 text-black dark:text-white w-60 shadow-xl rounded-lg p-3 z-50"

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

                <div className="flex gap-6 items-center">

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
                    <FiHome className="text-2xl"/>
                    Home

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
                    <FiShoppingCart className="text-2xl"/>
                    <span>Cart ({cartCount})</span>

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
                    <FiPackage className="text-2xl"/>
                    Orders

                    </NavLink>

                </div>

                <div className="relative"
                onMouseEnter={()=>setShowMenu(true)}
                onMouseLeave={()=>setShowMenu(false)}>
                    <button onClick={()=>setShowMenu(!showMenu)}
                      className="text-3xl cursor-pointer">
                        ☰
                      </button>
                    {
                        showMenu &&  (
                            <div className="absolute right-0 top-8 w-56 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-3 z-50">
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

                                <button

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

                                </button>

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

    );

};

export default Navbar;