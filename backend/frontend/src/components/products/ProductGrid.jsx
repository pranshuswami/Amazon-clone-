import ProductCard from "./ProductCard"


const ProductGrid = ({products}) => {
  return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {products.map((product)=>(
                <ProductCard 
                key={product.product_id}
                product={product} />
            ))}
        </div>
)
}

export default ProductGrid