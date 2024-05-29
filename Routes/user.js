const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');
const middleware = require('../middlewares/index');


router.get('/', userController.getAllUsers);
// router.get('/testing',userController.getAllUsersTesting);
router.post('/signup', userController.userSignup);
router.post('/login', userController.login);
router.get('/Profile', middleware.verifyUser, userController.getUserProfile);
router.post('/profileImage', middleware.upload.single('profileImage'), userController.updateImage);
router.put('/updateProfile', middleware.verifyUser, userController.updateUserProfile);
router.delete('/deleteProfile', middleware.verifyUser, middleware.verifyAdmin, userController.deleteUserById);
router.post('/saveLocation', middleware.verifyUser, userController.userLocation);




module.exports = router; 