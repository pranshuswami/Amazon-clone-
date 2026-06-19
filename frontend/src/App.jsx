import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";

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

      </Routes>
     
    </>
  );
}

export default App;