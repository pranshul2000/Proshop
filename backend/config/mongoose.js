const mongoose = require('mongoose');;
const colors = require('colors');

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);



const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to database "));

db.once('open', function(){
    console.log('Connected to database MongoDB'.green);
});

module.exports = db;
