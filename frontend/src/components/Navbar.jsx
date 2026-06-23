import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";


const Navbar =()=>{


const [keyword,setKeyword]=useState("");

const [cartCount,setCartCount]=useState(0);

const [token,setToken]=useState(
    localStorage.getItem("token")
);


const navigate=useNavigate();



useEffect(()=>{

    getCartCount();


    window.addEventListener(
        "storage",
        getCartCount
    );


    return()=>{

        window.removeEventListener(
            "storage",
            getCartCount
        );

    };


},[]);



const getCartCount=async()=>{


try{


const res=await axios.get(
"http://localhost:5000/cart/count",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);


setCartCount(res.data.count);


}
catch(error){

console.log(error);

}

};



const handleSearch=()=>{


navigate(`/search/${keyword}`);


};

const logout=()=>{

    localStorage.removeItem("token");

    setToken(null);

    navigate("/login");

};



return(

<nav className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-50 shadow-lg">


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

onChange={(e)=>setKeyword(e.target.value)}

className="w-full px-4 py-2 rounded-l-md border text-white"

/>



<button

onClick={handleSearch}

className="bg-yellow-400 px-5 rounded-r-md text-black font-semibold"

>

Search

</button>


</div>



<div className="flex gap-6">


<Link to="/" className="hover:text-blue-400">

Home

</Link>



<Link to="/cart" className="hover:text-blue-400">

Cart ({cartCount})

</Link>


<Link
to="/orders"
className="hover:text-blue-400 hover:font-medium"
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
    ()=>navigate("/login")
}

className="bg-red-500 hover:bg-red-700 active:scale-95 px-4 py-2 rounded-xl"

>

{

token
?
"Logout"
:
"Login"

}

</button>


</div>



</nav>

)

}


export default Navbar;