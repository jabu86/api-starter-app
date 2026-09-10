const { body, validationResult } = require("express-validator");
const fs = require("fs");

const validateProfile = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim(),
    body("email").notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email address"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // delete uploaded images if validation fails
            if (req.file) {
                const folderPath = `public/images/profile/${req.file.filename}`;
                fs.rm(folderPath, { recursive: true, force: true }, err => {
                    if (err) console.error(err);
                });
            }
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        next();
    },
];

const validateProfileUserPassword = [
    body("password").notEmpty().withMessage('Password is required.').bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    body("confirmPassword").notEmpty().withMessage("Please confirm your password.")
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

module.exports = {validateProfile , validateProfileUserPassword};