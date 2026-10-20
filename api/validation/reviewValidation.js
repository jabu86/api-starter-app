const { body, validationResult } = require("express-validator");
const validateReviews = [
    body("ratings")
        .trim()
        .notEmpty()
        .withMessage("Rating is required")
        .bail(),
    body("review")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

module.exports = validateReviews;