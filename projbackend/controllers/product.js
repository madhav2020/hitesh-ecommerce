const Product = require("../models/product");
const formidable = require("formidable");//to user form data
const _ = require("lodash"); //lodash help to upload the photo (_ means we will use this variable when needed)
const fs = require("fs"); //this will help to locate the file location
const product = require("../models/product");

// Get product id
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((error, product) => {
            if (error || !product) {
                return res.status(400).json({
                    Message: "Can't find the Product id",
                    error: error
                });
            }
            req.product = product;
            res.status(200).json({
                Message: req.product
            });
            next();
        });
};

// Method to create the product and save in our databse 
exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, file) => {
        if (error) {
            return res.status(400).json({
                Message: "Unable to upload the image",
                Error: error
            });
        }

        // Destructure the fields data
        const { name, description, category, price, stock } = fields;
        if (!name || !description || !category || !price || !stock) {
            return res.status(400).json({
                Message: "Please include all fields"
            });
        }

        let product = new Product(fields);

        // handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    Error: "The file size can't be bigger than 2.5mb"
                });
            }
            product.photo = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

            // console.log(product)
        }
        // save product to DB
        product.save((error, productDetailsData) => {
            if (error || !productDetailsData) {
                res.status(400).json({
                    Message: "Fail to save the product details in the database",
                    error: error
                });
            }
            res.status(200).json({
                product: productDetailsData
            });
        });
    });
};

// Method to grab the individual product by id
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.status(200).json(req.product);
};

// middleware to grab photo seperatly in the optimized way
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

// Method to grab all Product
exports.getAllProduct = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8; // ? is the turnary operatory like if else
    let sortBy = req.query.sortBy ? req.queery.sortBy : "_id"; // ? is the turnary operatory like if else

    Product.find()
        .select("-photo") // -photo means get all data except photo from the Product
        .populate("category") // this will populate the category
        .sort([[sortBy, "asc"]]) // will sort the order in ascending order
        .limit(limit) // this will limit the display of product in the frontend 
        .exec((error, allProductData) => {
            if (error || !allProductData) {
                return res.status(400).json({
                    Message: "Something went wrong Couldn't display the all data",
                    error: error
                });
            }
            res.status(200).json({
                products: allProductData
            });
        });
};

// Method to update the Product
exports.updatePorduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, file) => {
        if (error) {
            return res.status(400).json({
                Message: "Unable to upload the image",
                Error: error
            });
        }
        // code to update the fields
        let product = req.product; // we will get all product details from the req.product
        product = _.extend(product, fields); // _ means the loadash which we have decleared in the top

        // handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    Error: "The file size can't be bigger than 2.5mb"
                });
            }
            product.photo = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

            // console.log(product)
        }
        // save product to DB
        product.save((error, productDetailsData) => {
            if (error || !productDetailsData) {
                return res.status(400).json({
                    Message: "Fail to update the product details in the database",
                    error: error
                });
            }
            res.status(200).json({
                product: productDetailsData
            });
        });
    });
};

// Method to delete the Product
exports.deleteProduct = (req, res) => {
    const product = req.product;
    product.remove((error, deletedProduct) => {
        if (error || !deletedProduct) {
            return res.status(400).json({
                Message: `FAILED to delete the ${deletedProduct} product`,
                error: error
            });
        }
        res.status(200).json({
            Message: `The product ${deletedProduct} is DELETED successfully!`,
            deletedProduct
        });
    });
};

// method to get all uniqe category
exports.getUniqueCategory = (req, res) => {
    Product.distinct("category", {}, (error, allUniqueCategoryData) => {
        if (error) {
            return res.status(400).json({
                Message: "No Category Found",
                Error: error
            })
        }
        res.status(200).json({
            "uniquer categories": allUniqueCategoryData
        })
    })
}

// middleware to update the stock and sold values for
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        };
    });

    Product.bulkWrite(myOperations, {}, (error, result) => {
        if (error) {
            return res.status(400).json({
                Message: "Bulk operation failed",
                Error: error
            })
        }
        next();
    });
}
