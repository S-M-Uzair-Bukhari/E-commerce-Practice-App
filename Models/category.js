const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name :{
        type: String,
        required: true,
        unique: true
    }
},  {timestamps: true});

const itemCategory = mongoose.model('category', categorySchema);

module.exports = itemCategory;