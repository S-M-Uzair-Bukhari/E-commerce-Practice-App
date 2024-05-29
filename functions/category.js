const Category = require('../Models/category');

const createCategory = async (req) => {
    const newCategory = new Category(req.body);
    let category = await newCategory.save()
    return category;   
};

const getCategory = async () =>{
     // console.log('Getting Product Details');
     console.log('Getting Product Details for category');
     let category = await Category.find();
     return category
};

const updateCategory = async (categoryId, updatedData) =>{
    let updatedCategory = await Category.findByIdAndUpdate(categoryId,
        {$set: updatedData},
        {new: true}
    );
    return updatedCategory
};

const deleteCategory = async (categoryId) =>{
    let deletedCategory = await Category.findByIdAndDelete(categoryId);
    return deletedCategory
};


module.exports = { 
    createCategory, 
    getCategory,
    updateCategory,
    deleteCategory
};
