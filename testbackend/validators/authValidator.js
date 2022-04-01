
const { check, validationResult } = require('express-validator');

// Singup Validator exports
exports.signupValidator =[
    check('name').isLength({ min: 3 }).withMessage("Name must be at least 3 charactor"),
    check('email').isEmail().withMessage("Please enter the valid email id"),
    check('password').isLength({ min: 5 }).withMessage("Password must be at least 3 charactor")
]

// Signin Validator exports
exports.signinValidator = [
    check('email').isEmail().withMessage("Please enter the valid email id"),
    check('password').isLength({ min: 5 }).withMessage("Please enter the valid password")
]

// User Validation Result exports
exports.userValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }
    next();
}