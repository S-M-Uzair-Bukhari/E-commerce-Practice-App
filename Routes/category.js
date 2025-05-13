const express = require('express');
const router = express.Router();
const category =  require('../Controllers/category');
const middleware = require('../middlewares/index');

router.post('/createCategories', category.createCategory);
router.get('/getCategories', category.getCategory);
router.put('/updateCategory',middleware.verifyAdmin, category.updateCategoryById);
router.delete('/deleteCategory',middleware.verifyAdmin, category.deleteCategoryById);


module.exports = router;