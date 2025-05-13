const Order = require('../Models/order');
const Product = require('../Models/product');
const userModel = require('../Models/user');


const createOrder = async (req)=>{
    const { user, products } = req.body;
    if (!products || !user) {
        throw new Error('Missing Fields');
    }

    const userDetails = await userModel.findById(user);
    if (!userDetails) {
        throw new Error('User not found');
    }
    let totalAmount = 0;
    const formattedData =[];

    for (const item of products){
        let productDetails = await Product.findById(item.product);
        console.log(item);
        const{ subCategoryId, name, price} = productDetails;
        // const { quantity } = item;
        const totalProduct = productDetails.price  ;

        totalAmount += totalProduct;

        formattedData.push({
            productId: productDetails._id,
            subCategoryId: productDetails.subCategoryId._id,
            name: productDetails.name,
            price: productDetails.price,
            totalProduct

        });
    } 

    const newOrder = new Order({
        user:{
            id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            coordinates: userDetails.coordinates,
            placeName: userDetails.placeName,
            address: userDetails.address
        },
        products: formattedData,
        totalAmount
    });
    
    let order = await newOrder.save();
    return order
};

const getOrderById = async (orderId) =>{

};

module.exports = {
    createOrder,
    getOrderById
}