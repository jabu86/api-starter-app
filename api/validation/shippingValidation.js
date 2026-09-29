const { body, validationResult } = require("express-validator");

/*
 first_name: form.first_name,
      last_name: form.last_name,
      address: form.address_one,
      address_2: form.address_two,
      city: form.city,
      province: form.province,
      postal_code: form.code,
      country: form.country,
      */

const shippingValidator = [
    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),
    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),
    body("address")
        .trim()
        .notEmpty()
        .withMessage("One address is required"),
    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),
    body("province")
        .trim()
        .notEmpty()
        .withMessage("Province is required"),
    
    body("postal_code")
        .trim()
        .notEmpty()
        .withMessage("Postal code is required"),
    
    body("country")
        .trim()
        .notEmpty()
        .withMessage("Country is required"),   
   
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
];

module.exports = shippingValidator;