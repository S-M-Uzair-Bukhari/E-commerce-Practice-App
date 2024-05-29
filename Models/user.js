const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: 
    // String, 
    {
        type: String,
        required: true,
    },
    userName: 
    // String,
    {
        type: String,
        required: true,
        unique: true
    },
    email: 
    // String,
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    // String,
    {
        type: String,
        required: true,
    },
    profileImage: 
    {
        type: String
    
    },
    profileImagePath: 
    {
        type: String
    
    },
    sessionKey: 
    {
        type: String
    
    },
    placeName: 
    {
        type: String
    
    },
    address: 
    {
        type: String
    
    },
    coordinates:
    {
        type:
            {
            type: String, 
            enum: ['Point']
    },
        coordinates: {
            type:[Number],
        }
    }
}, { timestamps: true });

userSchema.index({ coordinates: '2dsphere'});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
