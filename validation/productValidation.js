const { body, validationResult } = require("express-validator");
const fs = require("fs");

const validateProduct = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .trim()
        .isLength({ min: 4, max: 50 })
        .withMessage(
            "Product can't be less than 4 characters and can't be longer than 50 characters."
        ),

    // validate images
    // body("images").custom((value, { req }) => {
    //     if (!req.files || req.files.length === 0) {
    //         throw new Error("Product images are required");
    //     }
    //     return true;
    // }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            // delete uploaded images if validation fails
            if (req.productImageFolder) {
                const folderPath = `public/images/products/${req.productImageFolder}`;
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

module.exports = validateProduct;