const express = require('express');
const app = express(); 
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/config');
const path = require('path');
require('dotenv').config();


const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(bodyParser.json());

app.use(cors());

// const user_routes = require('./Routes/user');

app.use('/media',
    express.static( path.resolve(__dirname, './uploads'))
);

app.use('/api/user/', require('./Routes/user'));
app.use('/api/admin/', require('./Routes/admin'));
app.use('/api/category/', require('./Routes/category'));
app.use('/api/subcategory/', require('./Routes/subCategory'));
app.use('/api/product/', require('./Routes/product'));
app.use('/api/order/', require('./Routes/order'));


app.get('/', (req,res) => {
    res.send('home');
});

const start = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log(`${PORT} It is Working`)
        });
    } catch (error) {
        console.log(error);
    }
};

start();