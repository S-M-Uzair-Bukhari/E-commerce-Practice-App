const express = require('express');
const router = express.Router();
const product =  require('../Controllers/product');
const middleware = require('../middlewares/index');


router.post('/createProduct', product.createProduct);
router.get('/getProducts', product.getProduct);
router.get('/getProductByCategory', product.getProductByCategory);
router.get('/getProductsBysubCategory', product.getProductBySubcategory);
router.put('/updateProduct',middleware.verifyAdmin, product.updateProductById);
router.post('/uploadImages',middleware.verifyAdmin, middleware.upload.array('images', 3), product.updateImage);
router.delete('/deleteProduct',middleware.verifyAdmin, product.deletProductByID);


module.exports = router;