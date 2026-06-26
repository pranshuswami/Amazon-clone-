const db = require("../config/db");

const getProductsByCategory = (req,res)=>{
const {slug}=req.params

const {brand,minPrice,maxPrice}=req.query

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

    const sql ="SELECT * FROM products WHERE product_id = ?"

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        
        res.status(200).json({
            success: true,
            data: result[0]
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

const getProducts = async()=>{


try{


const res = await API.get(

`/products/category/${slug}`,

{
params:{

brand: filters.brand.join(","),

minPrice: filters.minPrice,

maxPrice: filters.maxPrice
}}

);
console.log("API DATA",res.data);



setProducts(res.data.data);

setBrands(res.data.brands);
}
catch(error){

console.log(error);
}
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

module.exports = {
    getProductsByCategory,
    searchProducts,
    getSingleProduct,
    getProducts,
    getProductImages
};