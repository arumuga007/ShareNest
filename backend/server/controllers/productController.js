const productModel = require('./../models/productModel');
const userModel = require('./../models/usersModel');

const addProduct = async(req,res) => {
    try {
    const user = await userModel.getUser(req.user);
    console.log(user);
    console.log(user.exact_location);
    const {name, description, price, category} = req.body;
    const productDetails = [name, description, price, category, req.file.path, user.exact_location, true, user.user_id];
    const product = await productModel.addProduct(productDetails);
    console.log('product added successfully');
    return res.status(201).json({message: 'product added successfully'});
    }
    catch(error) {
        console.log("error occured while configuring product in product controller",error);
    }
}

const deleteProduct = async(req,res) => {
    await productModel.deleteProduct(req.body.productId);
    console.log('product body', req.body);
    return res.status(200).json({message: 'product deleted successfully'});
}

const getProduct = async(req,res) => {
    try {
        const user = await userModel.getUser(req.user);
        const products = await productModel.getProducts(user.exact_location, user.user_id);
        products.forEach((value) => {
            value.price = parseFloat(value.price) + (0.02 * parseFloat(value.price));
        })
        console.log('called',products);
        return res.status(201).json({message: 'product retreived successfully', products: products});
    }
    catch(error) {
        console.log("exception raised while getting a product in product controller", error);
    }
}

const productDetail = async(req,res) => {
    try {
        const productId = req.params.id;
        const productDetails = await productModel.productDetails(productId);
        console.log(productDetails);
        productDetails.price = parseFloat(productDetails.price) + (0.02 * parseFloat(productDetails.price));
        return res.status(201).json({message:'product details successfully', productDetails: productDetails});
    }
    catch(err) {
        console.log('exception raised on product detail controller', err);
        return res.status(400).json({message: 'product not found'});
    }
}



const myProducts = async (req, res) => {
    try {
        const userId = req.user;
        const products = await productModel.myProducts(userId);
        return res.status(200).json({ message: 'Products retrieved successfully', products: products });
    } catch (err) {
        console.log('error in my products in product controller', err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}





module.exports = {
    addProduct,
    getProduct,
    productDetail,
    myProducts,
    deleteProduct
}