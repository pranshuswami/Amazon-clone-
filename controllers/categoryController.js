const db = require("../config/db");

const getCategories = (req, res) => {

  const sql = "SELECT * FROM categories"

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  });

};

module.exports = {
  getCategories
};