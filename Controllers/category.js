const categoryFunction = require('../functions/category');

const createCategory = async (req,res) =>{
    try {
        console.log('creating New Category');
        let category = await categoryFunction.createCategory(req);
        res.status(200).json({msg: "Created Successfuly"});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Create Category"});
    }
};

const getCategory = async (req,res) =>{
    try {
        let category = await categoryFunction.getCategory();
        res.status(200).json({msg:"All Categories",category});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Get Category"});
    }
};

const updateCategoryById = async (req,res) => {
    try {
        console.log('Updating Category');
        const categoryId = req.body._id;
        const updatedData = req.body;
        let updateCategory = await categoryFunction.updateCategory(categoryId, updatedData);
        res.status(200).json({msg:'Category Successfully Updated',updateCategory});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Update Category"});
    }
};

const deleteCategoryById = async (req,res) => {
    try {
        console.log('Deleting Category');
        const categoryId = req.body;
        let deletedCategory = await categoryFunction.deleteCategory(categoryId);
        res.status(200).json({msg:'Category is Succesfully Deleted'});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Delete Category"});
    }
}

module.exports = { 
    createCategory, 
    getCategory,
    updateCategoryById,
    deleteCategoryById
 };