import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/Amazon Clone logo.png"


const Navbar = () => {


    const [keyword, setKeyword] = useState("");

    const [cartCount, setCartCount] = useState(0);

    const [showCategory, setShowCategory] = useState(false);

    const [categories, setCategories] = useState([]);


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
                    
                    className="h-14 w-36 object-contain" 
                    
                    src={logo} />

                    
                </Link>

                <div className="flex w-[45%] relative">

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

                    "text-blue-400 font-semibold"

                    :

                    "dark:text-white font-medium"

                    }

                    >

                    Home

                    </NavLink>

                    <NavLink

                    to="/cart"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold"

                    :

                    "dark:text-white font-medium"

                    }

                    >

                    🛒 Cart ({cartCount})

                    </NavLink>

                    <NavLink

                    to="/orders"

                    className={({isActive})=>

                    isActive

                    ?

                    "text-blue-400 font-semibold"

                    :

                    "dark:text-white font-medium"

                    }

                    >

                    Orders

                    </NavLink>

                </div>

                <button

                onClick={

                    token

                    ?

                    logout

                    :

                    ()=>navigate("/login")

                }

                className="bg-red-400 hover:bg-red-500 font-medium active:scale-95 px-4 py-2 rounded-xl cursor-pointer"

                >

                {

                token

                ?

                "Logout"

                :

                "Login"

                }

                </button>

                <button

                onClick={()=>setTheme(

                    theme==="dark"

                    ?

                    "light"

                    :

                    "dark"

                )}

                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg"

                >

                {

                theme==="dark"

                ?

                "☀️"

                :

                "🌙"

                }


                </button>

            </div>

        </nav>

    );

};

export default Navbar;