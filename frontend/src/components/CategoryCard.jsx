import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() =>
          navigate(`/products/${category.slug}`)
        } className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">

      <h2 className="text-lg text-gray-900 dark:text-gray-100 font-bold mb-3">
        {category.category_name}
      </h2>

      <img
        src={category.category_image}
        alt={category.category_name}
        className="w-full h-48 object-cover rounded"
      />

      <button
        onClick={() =>
          navigate(`/products/${category.slug}`)
        }
        className="text-white bg-blue-500 hover:bg-blue-800 font-bold rounded-lg px-2 py-1 mt-3"
      >
        View More
      </button>

    </div>
  );
};

export default CategoryCard;