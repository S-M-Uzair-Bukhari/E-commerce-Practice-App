const userModel = require('../Models/user');
const userFunction= require('../functions/user');
const validation = require('../functions/validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getAllUsers = async (req,res) => {
    try {
        const allUsers = await userFunction.getAllUsers();
        res.status(200).json(allUsers);

    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const getAllUsersTesting = async (req,res) => {
//     res.status(200).json({msg:"getAllUsersTesting is Working"});
// };

const userSignup = async (req, res) => {
    try {
        const validate = await validation.validateEmail(req,res)
        if(validate){
            return res.status(400).json({msg: 'Email or Username is already taken'});
        }
        console.log('SignUp User');
        let user = await userFunction.signUp(req);
        let RefreshToken = jwt.sign({
            userName:  user.userName,
            email: user.email,
        },process.env.SECRET_KEY, {expiresIn: '3 days'}) ;

        req.body.identifier = user.email
        await userFunction.updateToken(req, RefreshToken);
        let token = jwt.sign({
            userName: user.userName,
            email: user.email,
        }, process.env.SECRET_KEY, {expiresIn:'2h'});
        

        return res.status(200).json({
            user: {
                userName: user.userName,
                email: user.email,
                id: user._id,
            }, accessToken: token, RefreshToken            
        });
        
    } catch (error) {
        console.log("User Not signUp");
        console.error("Error signing up user:", error);       
    }
};


const login = async(req, res)=>{
    try {
        console.log('Loging User In')
        const validUser = await validation.validateUser(req,res);
        if (!validUser){
            return res.status(400).json({msg: `Couldn't find the user`})
        }
        let user = await userFunction.getProfile(req);
        const verify = await validation.verifyPassword(req.body.password, user.password);
        if (!verify){
            return res.status(401).json({msg: `Enter Right password`})
        }
       
        let RefreshToken = jwt.sign({
            // userName:  user.userName,
            email: user.email,
        },process.env.SECRET_KEY, {expiresIn: '3 days'}) ;

        await userFunction.updateToken(req, RefreshToken);
        let token = jwt.sign({
            // userName: user.userName,
            email: user.email,
        }, process.env.SECRET_KEY, {expiresIn:'2h'});
        

        return res.status(200).json({
            user: {
                userName: user.userName,
                email: user.email,
                id: user._id,
            }, accessToken: token, RefreshToken            
        });
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Error logging in user:"});
    }

};

const getUserProfile = async(req,res) =>{
    try {
        console.log("getting User Profile");
        let user = await userFunction.getUser(req);
        return res.status(200).json(user)
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "No User Found"});
    }

};

const updateUserProfile = async (req,res) =>{
    try {
        console.log('Updateing User Details');
        const  userId  = req.body._id;
        const updatedData = req.body;
        let userUpdated = await userFunction.updateProfile(userId, updatedData);
        return res.status(200).json({msg: 'User is Successfully Updated', userUpdated});
    } catch (error) {
        console.log("Can not Update User's Profile");
        console.error("No User Found:", error); 
    }

};

const updateImage = async (req,res) => {
    try {        
        console.log('Uploading Image');
        console.log('Recived Image:', req.file);
        console.log('User Id:', req.body._id);
        if(!req.file){
            return res.status(400).json({msg: 'Please Upload an Image'});
        }

        const updatedImage = await userFunction.updateImage(req);
        const user = await userFunction.findUser(req);
        return res.status(200).json({msg: 'Image is Successfully Uploaded', 
        user:{
            userId: req.body._id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            profileImage: user.profileImage,
            placeName: user.placeName,
            address: user.address

        }
    });
    } catch (error) {
        console.log("Can not Upload the image");
        console.error("Image Error:", error); 
    }
};

const deleteUserById = async (req,res) => {
    try {
        console.log("Deleting User Profile");
        const userId = req.body;
        let deletedUser = await userFunction.deleteProfile(userId);
        return res.status(200).json({msg: 'User is Successfully Deleted'});

    } catch (error) {
        console.log("Can not Delete User's Profile");
        console.error("No User Found:", error); 
    }
};

const userLocation = async (req,res) =>{
    try {
        console.log("saving User's Location");
        const userId = req.body._id;
        const { latitude,longitude, placeName, address } = req.body;
        if(!latitude || !longitude){
            return res.status(400).json({msg: "Latitude and Longitude is Required"});
        }

        let location = await userFunction.userLocation(userId, { latitude,longitude, placeName, address });
        // if(!location){
        //     return res.status(401).json({msg: "No User Found"});

        // }
        const { name, userName, email, coordinates, placeName: updatedPlaceName, address: updatedAddress } = location;
        return res.status(200).json({msg: 'Location is Saved Successfully!', 
        location:{
            userId,
            name,
            userName,
            email,
            coordinates,
            placeName,
            address
        }
    });

    } catch (error) {
        console.log("User's Location is Not SAved");
        console.error("having Error saving location:", error); 
    }
}


module.exports = {
    getAllUsers, 
    // getAllUsersTesting, 
    userSignup, 
    login, 
    getUserProfile, 
    updateUserProfile,
    updateImage,
    deleteUserById,
    userLocation
};