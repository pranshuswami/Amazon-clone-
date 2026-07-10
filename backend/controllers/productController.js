const db = require("../config/db");

const getProductsByCategory = (req,res)=>{
const {slug}=req.params

const {brand,minPrice,maxPrice,rating}=req.query

let sql ="SELECT p.*,c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id WHERE c.slug = ?"

let values=[slug];

if(brand){

const brands = brand.split(",");

sql += ` AND p.brand IN (${brands.map(()=>"?").join(",")})`;

values.push(...brands);

}

if(minPrice){

sql += " AND p.price >= ?";

values.push(minPrice);

}
if(maxPrice){
sql += " AND p.price <= ?"
values.push(maxPrice)
}

if(rating){
sql += " AND p.rating >= ?"
values.push(rating)
}
db.query(sql,values,(err,result)=>{


if(err){


return res.status(500).json({

success:false,

message:err.message

})


}
const brands=[

...new Set(

result.map(item=>item.brand)

)

]
res.json({

success:true,

data:result,

brands:brands

})
})
}
const getSingleProduct = (req, res) => {

    const { id } = req.params;

    const productSql ="SELECT p.*,s.ram,s.storage,s.display,s.processor,s.battery,s.rear_camera,s.front_camera,s.refresh_rate,s.operating_system,s.chipset,s.charging,s.network,s.weight     FROM products p LEFT JOIN product_specifications s ON p.product_id = s.product_id WHERE p.product_id = ?"

    const variationSql ="SELECT variation_id,product_id,color,storage,price,stock,image_url FROM product_variations WHERE product_id = ?"

    db.query(productSql, [id], (err, productResult) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (productResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        db.query(variationSql, [id], (err, variationResult) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            const product = productResult[0];

            // Add variations to the product object
            product.variations = variationResult;

            res.status(200).json({
                success: true,
                data: product
            });

        });

    });

};

const searchProducts = (req,res)=>{
const {keyword}=req.params

const sql ="SELECT p.*,c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id WHERE p.product_name LIKE ? OR p.brand LIKE ? OR c.category_name LIKE ? OR c.slug LIKE ?"
db.query(sql,[`%${keyword}%`,`%${keyword}%`,`%${keyword}%`,`%${keyword}%`],(err,result)=>{


if(err){

return res.status(500).json({

success:false,

message:err.message

});

}
res.json({

success:true,

data:result

});
});
};


const getProductImages = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM product_images
        WHERE product_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            data: result
        });

    });

};

const getRelatedProducts = (req, res) => {

    const { id } = req.params;

    const relatedSql = `
        SELECT
            p.product_id,
            p.product_name,
            p.description,
            p.brand,
            p.price,
            p.mrp,
            p.stock,
            p.image_url,
            p.rating,
            p.reviews
        FROM related_products rp
        JOIN products p
        ON rp.related_product_id = p.product_id
        JOIN products current_product
        ON current_product.product_id = rp.product_id
        WHERE rp.product_id = ?
        AND p.category_id = current_product.category_id
    `;

    const fallbackSql = `
        SELECT
            p.product_id,
            p.product_name,
            p.description,
            p.brand,
            p.price,
            p.mrp,
            p.stock,
            p.image_url,
            p.rating,
            p.reviews
        FROM products p
        WHERE p.category_id = (
            SELECT category_id
            FROM products
            WHERE product_id = ?
        )
        AND p.product_id != ?
        LIMIT 6
    `;

    db.query(relatedSql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length > 0) {
            return res.json({
                success: true,
                data: result
            });
        }

        db.query(fallbackSql, [id, id], (err, fallbackResult) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                data: fallbackResult
            });

        });

    });

};

module.exports = {
    getProductsByCategory,
    searchProducts,
    getSingleProduct,
    getProductImages,
    getRelatedProducts
};
