const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    images:[{
        type: String,
        required: true,
    }],
    price: {
        type: Number,
        required: true
    },
    subCategoryId:{
        type: Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
    stock:{
        type: Number,
        required: true
    }


}, { timestamps: true});

const product = mongoose.model('Product', productSchema);
module.exports = product;  