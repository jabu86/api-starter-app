const { body, validationResult } = require("express-validator");
const { User} = require('../models');


const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.").bail()
        .isEmail()
        .withMessage("Please enter a valid email address.").bail(),
    body("password").notEmpty().withMessage('Password is required.').bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required").bail(),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.").bail()
        .isEmail()
        .withMessage("Not a valid e-mail address.")
        .bail()
        .custom(async (value, {req}) => {
            const existingUser = await User.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error("A user already exists with this email address.");
            }
            return true;
        }),
    body("password").notEmpty().withMessage('Password is required.').bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.").bail(),
    body("confirm_password").notEmpty().withMessage("Please confirm your password.")
        .bail()
        .custom((value, {req, next}) => value === req.body.password)
        .withMessage("Passwords do not match."),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

const forgotValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.").bail()
        .isEmail()
        .withMessage("Please enter a valid email address.").bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

const resetValidation = [
    body("password").notEmpty().withMessage('Password is required.').bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    body("confirm_password").notEmpty().withMessage("Please confirm your password.")
        .bail()
        .custom((value, {req, next}) => value === req.body.password)
        .withMessage("Passwords do not match."),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

module.exports = {loginValidation, registerValidation , forgotValidation , resetValidation};