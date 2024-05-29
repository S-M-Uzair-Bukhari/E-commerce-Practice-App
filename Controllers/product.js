const productFunction = require('../functions/product');

const createProduct = async (req,res) =>{
    try {
        console.log('Creating Product');
        let product = await productFunction.createProduct(req);
        res.status(200).json({msg: " Product Created"});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Create Product"});
    }
};


const getProduct = async (req,res) =>{
    try {
        console.log('Getting Products');
        let getProduct = await productFunction.getAllProducts();
        res.status(200).json({msg: "All Product Details:", getProduct});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Get Product"});
    }
};

const getProductByCategory = async (req,res) =>{
    try {
        const { categoryId } = req.body;
        console.log('Getting Products by Category');
        let getProductByCat = await productFunction.getProductByCategory(categoryId);
        res.status(200).json({msg: "All Product Details By Category:", getProductByCat});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Get Products By category"});
    }
}

const getProductBySubcategory = async (req,res) =>{
    try {
        const { subCategoryId } = req.body;
        console.log(subCategoryId)
        console.log('Getting Products by Subcategory');
        let getProductBysubCat = await productFunction.getProductBySubcategory(subCategoryId);
        res.status(200).json({msg: "All Product From Subcategory:", getProductBysubCat});
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Get Products"});
    }
};

const updateProductById = async(req,res) =>{
    try {
        console.log('Updating Product');
        const productId = req.body._id;
        const updatedData = req.body;
        let updatedProduct = await productFunction.updateProduct(productId, updatedData);
        res.status(200).json({msg: "Product is Successfully Updated:", updatedProduct});

    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Update Product"});
    }
};

const updateImage = async (req,res) =>{
    try {
        console.log('Uploading Images');
        console.log('Receiving Product Id:', req.body._id);
        console.log("received files", req.files.map(file => file.path));
        if(!req.files)
        {
            res.status(400).json({msg: "Please upload atleast 1 image"});
        }
        let updateProduct = await productFunction.updateProductImage(req);
        res.status(200).json({msg: 'Images Are successfully Uploaded', updateProduct})
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Upload Product Images"});
    }
};

const deletProductByID = async (req,res) =>{
    try {
        console.log('Deleting Product');
        const productId = req.body;
        let deletedProduct = await productFunction.deleteProduct(productId);
        res.status(200).json({msg: 'Product is Successfully Deleted'});
        
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Delete Product"});
    }
}
module.exports = {
    createProduct,
    getProduct,
    getProductByCategory,
    getProductBySubcategory,
    updateProductById,
    updateImage,
    deletProductByID
};