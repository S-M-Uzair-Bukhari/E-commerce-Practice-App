const product = require('../Models/product');
const productModel = require('../Models/product');


const createProduct = async (req) =>{
    const newProduct = new productModel(req.body);
    let product = await newProduct.save();
    return product;

};


const getAllProducts = async () => {
    console.log('Gettings All Products:');
    let allProducts = await productModel.find({},
    {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    }).populate({
        path:'subCategoryId',
        populate:{
            path: 'parent'
        }
    });
    return allProducts
};

const getProductByCategory = async (categoryId) =>{
    console.log('Getting All products by Category');
    let productByCategory = await productModel.find({}).populate({
        path: "subCategoryId",
        match: { parent: categoryId },
        select: "parent"
    });
    return productByCategory
};

const getProductBySubcategory = async (subCategoryId) =>{
    console.log('Gettings All Products by Subcategory:',subCategoryId);
    let productsBySubcategory = await productModel.find({subCategoryId: subCategoryId},
        {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }).populate({
            path:'subCategoryId',
            populate:{
                path: 'parent'
            }
        });
    return productsBySubcategory
};

const updateProductImage = async (req) =>{
    const images = req.files.map(file => file.path);
    let product = await productModel.findById({ _id: req.body._id})
        product.images = images;
        product.imagePath = images.length > 0 ? "media/" + images[0] : "";
    const udpatedProduct = await product.save();
    return udpatedProduct
}; 

const updateProduct = async (productId, updatedData) =>{
    let updatedProduct = await productModel.findByIdAndUpdate(
        productId, 
        { $set: updatedData},
        {new: true}
    )
    return updatedProduct;
};

const deleteProduct = async (productId) =>{
    let deletedProduct = await productModel.findByIdAndDelete(productId);
    return deletedProduct
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductByCategory,
    getProductBySubcategory,
    updateProduct,
    updateProductImage,
    deleteProduct
};