const adminFunction = require('../functions/admin');
const validation = require('../functions/validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminSignup = async (req,res) =>{
    try {
        const validate = await validation.validateAdminEmail(req)
        if(validate){
            return res.status(400).json({msg: 'Email or Username is Already Taken!'});
        }
        console.log('Signing Admin');
        let admin = await adminFunction.adminSignup(req);
        let RefreshToken = jwt.sign({
            userName:  admin.adminUsername,
            email: admin.adminEmail,
        },process.env.SECRET_KEY, {expiresIn: '3 days'}) ;

        req.body.identifier = admin.adminEmail
        await adminFunction.updateAdminToken(req, RefreshToken);
        let token = jwt.sign({
            userName:  admin.adminUsername,
            email: admin.adminEmail,
        }, process.env.SECRET_KEY, {expiresIn:'2h'});

        return res.status(200).json({
            admin: {
                userName:  admin.adminUsername,
                email: admin.adminEmail,
                id: admin._id,
            }, accessToken: token, RefreshToken            
        });
    } catch (error) {
        console.log("Admin Not signUp");
        console.error("Error signing up Admin:", error); 
    }
};

const adminLogin = async (req,res) =>{
    try {
        console.log('Logging Admin In..!!!');
        let validate = await validation.validateAdmin(req);
        if(!validate){
            return res.status(400).json({msg: 'Can Not Find Admin'});
        }
        let admin = await adminFunction.getAdmin(req);
        const verify = await validation.verifyAdminPassword(req.body.adminPassword, admin.adminPassword);
        if(!verify){
            return res.status(401).json({msg:'Wrong Password. Try Again!'});
        }

        let RefreshToken = jwt.sign({
            adminName:  admin.adminUsername,
            email: admin.adminEmail,
        },process.env.SECRET_KEY, {expiresIn: '3 days'}) ;

        req.body.identifier = admin.adminEmail
        await adminFunction.updateAdminToken(req, RefreshToken);
        
        let token = jwt.sign({
            adminName:  admin.adminUsername,
            email: admin.adminEmail,
        }, process.env.SECRET_KEY, {expiresIn:'2h'});

        
        return res.status(200).json({
            admin: {
                userName:  admin.adminUsername,
                email: admin.adminEmail,
                id: admin._id,
            }, accessToken: token, RefreshToken 
    });      
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Error logging in Admin:"});
    }
};

const getProfile = async(req,res) => {
    try {
        console.log('Getting Admin Profile');
        let admin = await adminFunction.getAdminProfile(req);
        return res.status(200).json(admin);
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Error Getting in Admin's Profile:"});
    }
};

const updateAdmin = async (req,res) =>{
    try {
        console.log('Getting Admin Profile');
        const adminId = req.body._id;
        const updatedData = req.body;
        let updatedAdmin = await adminFunction.updateAdmin(adminId, updatedData);
        return res.status(200).json({msg: 'Admin Details are successfully Updated', updatedAdmin});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Error in updating Admin Details"});
    }
};

module.exports = {
    adminSignup,
    adminLogin,
    getProfile,
    updateAdmin
};