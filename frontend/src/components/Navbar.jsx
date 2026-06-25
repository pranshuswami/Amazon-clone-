import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const Navbar = () => {


    const [keyword, setKeyword] = useState("");

    const [cartCount, setCartCount] = useState(0);

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


        <nav className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-4 sticky top-0 z-50 shadow-lg">


            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link to="/">


                    <h1 className="text-2xl font-bold">

                        Amazon Clone

                    </h1>


                </Link>


                <div className="flex w-1/2">

                    <input

                        type="text"

                        placeholder="Search Product..."

                        value={keyword}

                        onChange={(e) => setKeyword(e.target.value)}

                        className="border-black dark:border-white w-full px-4 py-2 rounded-l-md border text-black dark:text-white"

                    />

                    <button

                        onClick={handleSearch}

                        className="bg-yellow-400 px-5 rounded-r-md text-black font-semibold cursor-pointer"

                    >

                        🔍Search


                    </button>


                </div>


                <div className="flex gap-6">

                    <Link

                        to="/"

                        className="hover:text-blue-400 "

                    >

                        Home


                    </Link>

                    <Link

                        to="/cart"

                        className="hover:text-blue-400"

                    >

                        Cart ({cartCount})


                    </Link>

                    <Link

                        to="/orders"

                        className="hover:text-blue-400"

                    >

                        Orders


                    </Link>

                </div>

                <button

                    onClick={

                        token

                            ?

                            logout

                            :

                            () => navigate("/login")

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


                    onClick={() => setTheme(

                        theme === "dark"

                            ?

                            "light"

                            :

                            "dark"

                    )}


                    className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer"

                >

                    {

                        theme === "dark"

                            ?

                            "☀️ Light"

                            :

                            "🌙 Dark"

                    }

                </button>

            </div>


        </nav>
    );
};


export default Navbar;