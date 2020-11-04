const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const env = require('./config/environment');
const app = express();
const PORT = env.Port;
const db = require('./config/mongoose');
const colors = require('colors');
const errorMware = require('./middleware/errorMiddleware');




app.get("/", (req, res) => {
  res.send("api is running...");
});



app.use('/api/products', require('./routes/productRoutes'));

app.use(errorMware.notFound);


app.use(errorMware.notFound);

app.listen(PORT, console.log("Server Running ".green));