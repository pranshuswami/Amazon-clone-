import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
    const navigate = useNavigate();

  return (
    <div 
    onClick={()=>navigate(`/product/${product.product_id}`)}
    className="bg-gray-800 p-4 rounded">
        <img src={product.image_url} className="w-70 h-60 object-contain"/>
        <p className="text-xs text-gray-300 ">Sponsered ⓘ</p>
        
        <h2 className="font-bold text-lg mt-1">{product.product_name}</h2>
        <p className="text-gray-300 line-clamp-2 hover:text-orange-200 cursor-pointer">{product.description}</p> 
        <div className="mt-1">
            <span className="text-sm">⭐⭐⭐⭐⭐{product.rating}/5 </span>
                
            <span className="">({product.reviews})</span>
        </div>
        <h1 className="text-xl font-bold mt-2">{product.price} <span className="text-sm cursor-pointer"> M.R.P: ₹̶1̶,̶5̶0̶,̶0̶0̶0̶</span></h1>
        <p className="mt-0.5">FREE delivery Mon, 22 Jun</p>
        <p className="text-red-400  mt-0.5 font-medium">{product.stock} left in stock</p>
        <button className="bg-yellow-500 text-black active:scale-95 font-bold w-full rounded-full mt-3 py-2">+ Add to Cart</button>
    </div>
  )
}

export default ProductCard