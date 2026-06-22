import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if(keyword.trim()){
      navigate(`/search/${keyword.trim()}`);

    }
};

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-50 shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/">
          <h1 className="text-2xl font-bold ">
            Amazon Clone
          </h1>
        </Link>

        <div className="flex w-1/2">

          <input
            type="text"
            placeholder="Search Product..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            
            className="w-full px-4 py-2 rounded-l-md border border-gray-700  text-white"
          />

          <button
            onClick={handleSearch}
            className="bg-yellow-400 px-5 active:scale-95 rounded-r-md text-black font-semibold"
          >
            Search
          </button>

        </div>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-blue-400 hover:font-medium"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="hover:text-blue-400 hover:font-medium"
          >
            Cart
          </Link>

          

        </div>

      </div>

    </nav>
  );
};

export default Navbar;