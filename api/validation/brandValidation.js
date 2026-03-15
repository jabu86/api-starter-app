const { body, validationResult } = require("express-validator");
const fs = require("fs");

const validateBrand = [
    body("name")
        .notEmpty()
        .withMessage("Brand name is required")
        .trim()
        .isLength({ min: 4, max: 50 })
        .withMessage(
            "Brand name can't be less than 4 characters and can't be longer than 50 characters."
        ),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // delete uploaded images if validation fails
            if (req.file) {
                const folderPath = `public/images/brands/${req.file.filename}`;
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

module.exports = validateBrand;