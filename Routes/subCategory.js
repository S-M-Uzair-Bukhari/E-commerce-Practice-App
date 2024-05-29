const express = require('express');
const router = express.Router();
const subCategory = require('../Controllers/subCategory');
const middleware = require('../middlewares/index');


router.post('/createSubcategory',middleware.verifyAdmin, subCategory.createSubCategory);
router.get('/getSubCategory', subCategory.getSubCategory);
router.put('/updateSubCategory', subCategory.updateSubCategory);
router.delete('/deleteSubCategory', subCategory.deleteSubCategory);

module.exports = router;

