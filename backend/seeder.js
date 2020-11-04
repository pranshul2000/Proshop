const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const db = require('./config/mongoose');


const importData = async () =>{
    try {
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();

       const createdUsers = await User.insertMany(users);

       const adminUser = createdUsers[0]._id

       const sampleProducts = products.map(product => {
           return { ...product, user: adminUser}
       })

       await Product.insertMany(sampleProducts);

       console.log('data Imported'.green.inverse)
       process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
        
    }
}

const destroyData = async () =>{
    try {
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();

       

       console.log('Data Destroyed'.red.inverse)
       process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
        process.exit(1);
        
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}