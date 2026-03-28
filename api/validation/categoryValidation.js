const { body, validationResult } = require("express-validator");
const {Category} = require('../models');

const validateCategory = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .bail()
        .isLength({ min: 4, max: 50 })
        .withMessage("Category name must be between 4 and 50 characters.")
        .bail()
        .custom(async (value, {req}) => {
            const category = await Category.findOne({ where: { name: value } });
            if (category && category.id !== parseInt(req.params.id)) {
                throw new Error("Category already exists");
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

module.exports = validateCategory;