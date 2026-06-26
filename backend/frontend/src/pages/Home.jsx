import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";

const Home = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className=" min-h-screen p-6">

      {/* <h1 className="text-4xl text-white font-bold mb-8">
        Amazon Clone
      </h1> */}

      <div className="grid grid-cols-3  gap-6">

        {categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            category={category}
          />
        ))}

      </div>

    </div>
  );
};

export default Home;