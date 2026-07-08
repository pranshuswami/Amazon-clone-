import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"


const ProductGrid = ({products}) => {
  const getColumnCount = () => {
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return 2;
    }

    const zoom = window.screen.width / window.innerWidth;

    if (zoom <= 0.78) {
      return 5;
    }

    if (zoom <= 0.92) {
      return 4;
    }

    return 3;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(getColumnCount());
    };

    updateColumnCount();

    window.addEventListener("resize", updateColumnCount);

    return () => {
      window.removeEventListener("resize", updateColumnCount);
    };
  }, []);

  return (
    
        <div
          className="grid gap-1 lg:gap-3"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`
          }}
        >

            {products.map((product)=>(
                <ProductCard 
                key={product.product_id}
                product={product} />
            ))}
        </div>
)
}

export default ProductGrid
