const express = require('express');
const router = express.Router();
const order =  require('../Controllers/order');
const middleware = require('../middlewares/index');


router.post('/createOrder', middleware.verifyUser, order.createOrder);
router.get('/getOrder', middleware.verifyUser, middleware.verifyAdmin, order.getOrder);


module.exports = router;