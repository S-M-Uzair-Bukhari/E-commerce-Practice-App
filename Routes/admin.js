const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');
const middleware = require('../middlewares/index');


router.post('/adminSignup', adminController.adminSignup);
router.post('/adminLogin', adminController.adminLogin);
router.get('/adminProfile',middleware.verifyAdmin, adminController.getProfile);
router.put('/updateAdmin',middleware.verifyAdmin, adminController.updateAdmin);


module.exports = router;