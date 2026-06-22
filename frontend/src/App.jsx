import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
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
         path="/search/:keyword"
         element={<SearchPage />}
       />
       <Route
        path="/cart"
        element={<Cart />}
       />
       <Route
        path="/search/:keyword"
        element={<SearchResult />}
      />
       
      </Routes>
     
    </>
  );
}

export default App;