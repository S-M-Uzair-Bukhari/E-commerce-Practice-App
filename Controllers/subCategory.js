const subCategoryFunction = require('../functions/subCategory');

const createSubCategory = async (req,res) =>{
    try {
        console.log('Creating SubCategory');
        let subCategory = await subCategoryFunction.creatSubcategory(req);
        res.status(200).json({msg: "Subcategory Created", subCategory});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Create Subcategory"});
    }
};

const getSubcategoryByCategory = async (req,res)=>{
    try {
        console.log('This is the Category Id', req.query);
        const { parent } = req.query;
        console.log("this is Cat ID:",parent);
        console.log('Getting Subcategory by Category');
        let getSubCatByCat = await subCategoryFunction.getSubCatByCategory(parent);
        res.status(200).json({msg: "All Product From Subcategory:", getSubCatByCat});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Get SubCategories by Category"});
    }
};

const getSubCategory = async (req,res) => {
    try {
        console.log('Getting Subcategories');
        let getSubCategory = await subCategoryFunction.getAllSubCategory();
        res.status(200).json({msg: "All Subcategories Details:", getSubCategory});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Get Subcategories"});
    }
};

const updateSubCategory = async (req,res) =>{
    try {
        console.log('Updating SubCategory');
        const subCatIt = req.body._id;
        const updatedData = req.body;
        let updated = await subCategoryFunction.updateSubCategory(subCatIt, updatedData);
        res.status(200).json({msg: 'SubCategory is updated', updated});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Update Subcategories"});
    }
};

const deleteSubCategory = async (req,res) =>{
    try {
        console.log('Deleting SubCategory');
        subcatId = req.body.id;
        // console.log('Fetch',subcatId)
        let deletedSubCat = await subCategoryFunction.deleteSubCategory(subcatId);
        res.status(200).json({msg: 'SubCategory is Deleted Successfully'});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Delete Subcategories"});
    }
}

module.exports = {
    createSubCategory,
    getSubCategory,
    getSubcategoryByCategory,
    updateSubCategory,
    deleteSubCategory
};