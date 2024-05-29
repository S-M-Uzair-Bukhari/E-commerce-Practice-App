const mongoose = require('mongoose');
const userModel = require('../Models/user');
const bcrypt = require('bcryptjs');


const signUp = async(req, sessionKey) => {
    const newUser = new userModel(req.body);
    let hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = hash;
    newUser.sessionKey = sessionKey;
    let result = await newUser.save();
    console.log("singUp Function", result);
    return result
    
};

const updateToken = async (req, refreshToken) =>{
    // console.log('Identifier:', req.body.identifier);
    // console.log('Token:', refreshToken);    
    let user = await userModel.findOneAndUpdate({ email: req.body.identifier},{ $set: { sessionKey: refreshToken }} )
    return user;
}

const getProfile = async(req)=>{ 
    let user = await userModel.findOne({ email: req.body.email });
    return user;
};

const getUser = async(req) =>{
    console.log('Fetching profile for email:', req.user.email);
    let user = await userModel.findOne({ email: req.user.email}, { password: 0, __v: 0 });
    return user;
};

const findUser = async (req) =>{
    let user = await userModel.findById(req.body._id);
    console.log('User:', req.body._id, user);
    return user;
};

const updateProfile = async (userId, updatedData) =>{
    console.log('This is User Id:',userId );
    console.log('This is Updated Data:', updatedData)

    // let userBeforeUpdate = await userModel.findById(userId);
    // console.log('User Before Update:', userBeforeUpdate);

    // if (!userBeforeUpdate) {
    //     throw new Error('User not found');
    // }

    let userUpdated = await userModel.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true }
    );
    return userUpdated
};

const updateImage = async (req) =>{
    const profileImage = await userModel.findByIdAndUpdate({ _id: req.body._id }, 
        {$set: {
            profileImage: req.file.filename, 
            profileImagePath: 'media/' + req.file.filename
        }
    },
    { new: true}
);
    return profileImage;
};

const deleteProfile = async (userId) => {
    let deleteUser = await userModel.findByIdAndDelete(userId);
    return deleteUser;
};

const userLocation = async (userId, { latitude,longitude, placeName, address }) =>{
    let location = await userModel.findByIdAndUpdate(
        userId,
        {
            coordinates:{
                type: 'Point',
                coordinates:[longitude, latitude]
            },
            placeName: placeName,
            address: address
        },
        { new: true}
    )
    return location;
};

module.exports = { 
    signUp, 
    updateToken, 
    getProfile, 
    getUser,
    findUser,
    updateProfile,
    updateImage,
    deleteProfile,
    userLocation
};