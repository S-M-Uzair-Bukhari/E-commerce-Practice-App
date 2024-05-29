const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = () =>{  
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb is connected")
    } catch (error) {
        console.log("mongodb is NOT connected:",error);
    }
};

module.exports = connectDB;