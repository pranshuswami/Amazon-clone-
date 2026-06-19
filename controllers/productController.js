const db = require("../config/db");

const getProductsByCategory = (req, res) => {

  const { slug } = req.params;

  const sql ="SELECT p.*,c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id WHERE c.slug = ?"

  db.query(sql, [slug], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });

  });

};

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

const searchProducts = (req, res) => {
  const { keyword } = req.params;

  const sql = "SELECT * FROM products WHERE product_name LIKE ?"

  db.query(sql, [`%${keyword}%`], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};



module.exports = {
    getProductsByCategory,
    searchProducts,
    getSingleProduct
};