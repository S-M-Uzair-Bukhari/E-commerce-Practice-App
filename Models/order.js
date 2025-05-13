const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    user:{
        id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    products:[{
        productId:{
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity:{
            type: Number,
            required: false
        },
        category: {
            type: String,
            // required: true
        },
        name:{
            type: String,
            // required: true 
        },

        price:{
            type: Number,
            // reuired: true 
        },
        totalProduct: {
            type: Number,
            // reuired: true 
        }
    }], 
    totalAmount: {
        type: Number,

    },
}, { timestamps: true });


const order = mongoose.model('Order', orderSchema);
module.exports = order; 