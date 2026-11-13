const { body, validationResult } = require("express-validator");
const validateContactForm = [
  body("name").trim().notEmpty().withMessage("Name is required").bail(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .bail(),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .bail()
    .isLength({ max: 250 })
    .withMessage("Message can't be more than 250 characters.")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateContactForm;
