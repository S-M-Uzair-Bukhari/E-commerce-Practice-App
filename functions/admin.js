const adminModel = require('../Models/admin');
const bcrypt = require('bcryptjs');


const adminSignup = async (req, sessionKey) => {
    const newAdmin = new adminModel(req.body);
    let hash = await bcrypt.hash(req.body.adminPassword, 10);
    newAdmin.adminPassword = hash;
    newAdmin.sessionKey = sessionKey;
    let result = await newAdmin.save();
    console.log('Admin Signed Up', result);
    return result;
};

const updateAdminToken = async (req,refereshToken) =>{
    let admin = await adminModel.findOneAndUpdate({ adminEmail: req.body.identifier}, {$Set: {sessionKey: refereshToken}});
    return admin
};

const getAdmin = async (req) => {
    let admin = await adminModel.findOne({adminEmail: req.body.adminEmail});
    return admin;
};


const getAdminProfile = async (req) => {
    let admin = await adminModel.findOne({ adminEmail: req.body.adminEmail }, { adminPassword: 0, __v: 0 });
    return admin;
};

const updateAdmin = async (adminId, updatedData) => {

    let updatedAdmin = await adminModel.findByIdAndUpdate(
        adminId,
        { $set: updatedData },
        { new: true}
    )
    return updatedAdmin;
};



module.exports = {
    adminSignup,
    updateAdminToken,
    getAdmin,
    getAdminProfile,
    updateAdmin
};