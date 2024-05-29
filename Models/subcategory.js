const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name :{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    parent:{
        type : Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
},  {timestamps: true});

const subCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategory;