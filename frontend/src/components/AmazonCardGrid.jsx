import { useNavigate } from "react-router-dom";

const AmazonGridCard = ({ category }) => {
  const navigate = useNavigate();

  const getSubItems = (catName, fallbackImg) => {
    if (catName === "Electronics") return [
      { name: "Upto 70% off on Headphones", img: fallbackImg },
      { name: "Upto 5-% off on Smartwatches", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
      { name: "Upto 30% off on Speakers", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400" },
      { name: "Upto 20% off on Laptops", img: "https://i.pinimg.com/1200x/00/11/68/0011689d12b44ef94c17f771e9cc56f7.jpg" }
    ];
    if (catName === "Fashion") return [
      { name: "Upto 15% off on Clothing", img: fallbackImg },
      { name: "Upto 5% off on Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { name: "Upto 40% off on Watches", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400" },
      { name: "Upto 10% off on Bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" }
    ];
    if (catName === "Books") return [
      { name: "Upto 15% off on Fiction", img: fallbackImg },
      { name: "Upto 15% off on Academic", img: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400" },
      { name: "Upto 15% off on Self-Help", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400" },
      { name: "Upto 15% off on Children's", img: "https://i.pinimg.com/1200x/35/16/69/351669756b8a51ac8f9592675e44ff7d.jpg" }
    ];
    if (catName === "Home Appliances") return [
      { name: "Upto 15% off on Kitchen", img: fallbackImg },
      { name: "Upto 15% off on Cleaning", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400" },
      { name: "Upto 15% off on Climate Control", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400" },
      { name: "Upto 15% off on Washing", img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400" }
    ];
    if (catName === "Mobiles") return [
      { name: "Upto 15% off on Android", img: fallbackImg },
      { name: "Upto 15% off on iPhones", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400" },
      { name: "Upto 15% off on Cases", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400" },
      { name: "Upto 15% off on Powerbanks", img: "https://i.pinimg.com/736x/2e/1b/05/2e1b05bd3932bd15227f410957db632b.jpg" }
    ];
    if (catName === "Deals of the Day") return [
      { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" },
      { name: "Home Essentials", img: "https://i.pinimg.com/736x/6e/b2/8b/6eb28b4b2330ac1e5d23e3493faa063c.jpg" },
      { name: "Fashion Deals", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" },
      { name: "Top Books", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" }
    ];
    if (catName === "Amazon Prime") return [
      { name: "Prime Video", img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" },
      { name: "Free Delivery", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400" },
      { name: "Prime Music", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400" },
      { name: "Early Access", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" }
    ];
    if (catName === "Gift Cards") return [
      { name: "Birthday", img: "https://i.pinimg.com/736x/9a/ee/2f/9aee2ff696211152a7d1eda0157bc53c.jpg" },
      { name: "Anniversary", img: "https://i.pinimg.com/736x/b5/36/07/b5360747a50b3dc39372b9292e886056.jpg" },
      { name: "Corporate", img: "https://i.pinimg.com/1200x/91/ac/8e/91ac8e42005d58fef108abb6dc0e48de.jpg" },
      { name: "E-Gift", img: "https://i.pinimg.com/736x/62/58/f9/6258f9cb575d9c020f6390ae906fbf96.jpg" }
    ];

    return [
      { name: "See all", img: fallbackImg },
      { name: "New Arrivals", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
      { name: "Best Sellers", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400" },
      { name: "Recommended", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" }
    ];
  };

  const quadItems = getSubItems(category.category_name, category.category_image);

  return (
    <div 
      onClick={() => navigate(`/products/${category.slug}`)}
      className="bg-white p-5 shadow-sm border border-gray-200 flex flex-col justify-between h-[470px] text-[#0F1111] cursor-pointer hover:shadow-md transition-shadow group/card"
    >
      <div>
        <h2 className="text-2xl  font-bold leading-tight mb-4 line-clamp-1">
          {category.category_name}
        </h2>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4">
          {quadItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col "
            >
              <div className="w-full h-[110px] bg-[#F7F8F8] flex items-center justify-center overflow-hidden rounded-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <span className="text-base text-[#0F1111] mt-1 font-normal">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <span className="text-[#007185] group-hover/card:text-[#C45500] group-hover/card:underline text-base font-medium self-start mt-5">
        See all offers
      </span>
    </div>
  );
};

export default AmazonGridCard;