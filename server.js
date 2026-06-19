const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});