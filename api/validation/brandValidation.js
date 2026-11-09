const { body, validationResult } = require("express-validator");
const fs = require("fs");

const validateBrand = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Brand name is required")
        .isLength({ min: 4, max: 50 })
        .withMessage(
            "Brand name can't be less than 4 characters and can't be longer than 50 characters."
        ),
    body("image")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Image is required");
            }
            return true;
        }),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            // delete uploaded images if validation fails
            if (req.file) {
                const folderPath = `public/images/brands/${req.file.filename}`;
                fs.rm(folderPath, { recursive: true, force: true }, err => {
                    if (err) console.error(err);
                });
            }
            const formatErrors = (errorsArray) => {
                const formatted = {};

                errorsArray.forEach(err => {
                    if (!formatted[err.field]) {
                        formatted[err.field] = [];
                    }
                    formatted[err.field].push(err);
                });

                return res.status(400).json({
                    errors: formatted,

                });
            };

        }

        next();
    },
];

module.exports = validateBrand;