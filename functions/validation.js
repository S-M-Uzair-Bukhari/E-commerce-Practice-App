const user = require('../Models/user');
const admin = require('../Models/admin');
const bcrypt = require('bcrypt');



const validateEmail = async (req, res) => {
    console.log({email: req.body.email });
    const { name, userName, email, password } = req.body;
    // console.log(req.body);
    let existingUser = await user.findOne({ $or: [{email}, {userName}] });
    if (existingUser){ 
        return true;
    } else {
        return false;
    }
    
};

const validateUser = async (req)=>{
    const { email, userName } = req.body;
    let existing = await user.findOne({ $or: [{email}, {userName}] });
    if (existing){
        return true;
    } else {
        return false;
    }
};  

const verifyPassword = async (password, hash) => {
    let match = await bcrypt.compare(password, hash);
    console.log('testing', match);
    return match
};

const validateAdminEmail = async (req, res) => {
    console.log({email: req.body.adminEmail });
    const { name, adminUsername, adminEmail, password } = req.body;
    // console.log(req.body);
    let existingUser = await admin.findOne({ $or: [{adminEmail}, {adminUsername}] });
    if (existingUser){ 
        return true;
    } else {
        return false;
    }
    
};

const validateAdmin = async (req)=>{
    const { adminEmail, adminUsername } = req.body;
    let existing = await admin.findOne({ $or: [{adminEmail}, {adminUsername}] });
    if (existing){
        return true;
    } else {
        return false;
    }
};

const verifyAdminPassword = async (adminPassword, hash) => {
    let match = await bcrypt.compare(adminPassword, hash);
    console.log('testing', match);
    return match
};

module.exports= { 
    validateEmail, 
    validateUser, 
    verifyPassword, 
    validateAdmin,
    validateAdminEmail,
    verifyAdminPassword 
}; 