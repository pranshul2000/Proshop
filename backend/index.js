const express = require("express");
const products = require("./data/products");
const dotenv = require('dotenv');
dotenv.config();
const env = require('./config/environment');
const app = express();
const PORT = env.Port;
const db = require('./config/mongoose');
const colors = require('colors');



app.get("/", (req, res) => {
  res.send("api is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) =>{
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
})
app.listen(PORT, console.log("Server Running ".green));
