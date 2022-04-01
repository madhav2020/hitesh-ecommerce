const Category = require("../models/category");

// Methods to get category id
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id)
    .exec((error, categoryId) => {
        if (error) {
            return res.status(400).json({
                message: "Category not found in the DB"
            });
        }
        req.category = categoryId; //Category Data(mainly category id) is saved int he req.category
        next();
    })

};

// method to create the new category and save in our DB
exports.createCategory = (req, res) => {
    const category = new Category(req.body); // grab the user input from the frontend and store in the category
    category.save((error, categoryData) => {
        if (error) {
            return res.status(400).json({
                Message: "Unable to save category in the DB",
                error: error
            });
        }
        res.status(200).json({
            category: categoryData
        });
    });
};

// Method to grab the individual category
exports.getCategory = (req, res) => {
    return res.status(200).json({
        category: req.category
    })
};

// Method to grab all Category
exports.getAllCategory = (req, res) => {
    Category.find().exec((error, allCategoryData) => {
        if (error) {
            return res.status(400).json({
                Message: "NOT found any category in the DB",
                Error: error
            })
        }
        res.status(200).json({
            category: allCategoryData
        })
    });
};

// Method to update the category
exports.updateCategory = (req, res) => {
    const category = req.category; //Grab the category id by req.category(this we can do this because of the middleware getCategoryById) 
    category.name = req.body.name; // get the update field(name) from the frontend user and replace it with new name

    category.save((error, categoryUpdatedData) => {
        if (error) {
            return res.status(400).json({
                Message: "Updated name is failed to save in the DB",
                Error: error
            })
        }
        res.status(200).json({
            "updated name": categoryUpdatedData
        });
    });
};

// Method to delete the category
exports.deleteCategory = (req, res) => {
    const category = req.category; //Grab the category id by req.category(this we can do this because of the middleware getCategoryById)
    category.remove((error, deletedCategory) => {
        if (error) {
            return res.status(400).json({
                Message: `Failed to delete category ${deletedCategory}`,
            });
        }
        res.status(200).json({
            Message: `Category ${deletedCategory.name} deleted successfully!`
        });
    });

};
