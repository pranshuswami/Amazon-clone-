const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes");
const reviewRoutes=require("./routes/reviewRoutes")
const addressRoutes = require("./routes/addressRoutes");
const authRoutes=require("./routes/authRotes");
const profileRoutes =require("./routes/profileRoutes")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);
app.use("/reviews",reviewRoutes);
app.use("/address",addressRoutes);
app.use("/auth",authRoutes);
app.use("/profile",profileRoutes)


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});