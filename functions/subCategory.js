const subCategoryModel = require('../Models/subcategory');


const creatSubcategory = async (req) =>{
    const newSubcategory = new subCategoryModel(req.body);
    let subCategory = await newSubcategory.save();
    return subCategory;
};


const getAllSubCategory = async (req) => {
    console.log('Gettings All Products:');
    let allsubCategories = await subCategoryModel.find({},
    {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    }).populate('parent');
    return allsubCategories
};

const getSubCatByCategory = async (parent) => {
    console.log("Getting Subcategory By Category", parent);
    let subCatByCat = await subCategoryModel.find({parent}).populate({
        path: 'parent',
    });
    return subCatByCat
};

const updateSubCategory = async (subCatId, updatedData) => {
    console.log('Updating SubCategory');
    let updatedsubCategory = await subCategoryModel.findByIdAndUpdate(
        subCatId,
        { $set: updatedData },
        { new: true}
        );
    return updatedsubCategory;
};

const deleteSubCategory = async (subcatId) => {
    console.log('Deleting SubCategory', subcatId);
    let deletsubcat = await subCategoryModel.findByIdAndDelete(subcatId);
    return deletsubcat
};


module.exports = {
    creatSubcategory,
    getAllSubCategory,
    getSubCatByCategory,
    updateSubCategory,
    deleteSubCategory
};