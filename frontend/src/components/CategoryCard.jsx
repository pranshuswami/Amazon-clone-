import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    // Prevents bubbling events if clicking elements inside the card container
    e.stopPropagation();
    navigate(`/products/${category.slug}`);
  };

  return (
    <div 
      onClick={() => navigate(`/products/${category.slug}`)} 
      className="bg-white shadow-sm border border-gray-200 flex flex-col justify-between h-[450px] cursor-pointer hover:shadow-md transition-shadow"
    >
      <div>
        <h2 className="text-[21px] font-bold text-[#0F1111] leading-tight mb-3 line-clamp-1">
          {category.category_name}
        </h2>

        <div className="w-full h-[240px] bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={category.category_image}
            alt={category.category_name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
          />
        </div>
      </div>

      <button
        onClick={handleNavigation}
        className="text-[#007185] hover:text-[#C45500] hover:underline text-sm font-medium self-start mt-3"
      >
        See all offers
      </button>
    </div>
  );
};

export default CategoryCard;