const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const productController = require('../controllers/productController');

const { body } = require('express-validator');
const upload = require("../middleware/upload");

/**
 * index route
 * Get all products
 */
router.get('/products' ,productController.index);

/**
 * create routes
 * Create products
 */
router.post('/products' ,upload.single("brand"),[
    body("name").notEmpty().withMessage('Product name is required')
        .trim()
        .isLength({min:4 , max:50 }).withMessage("Product can't be less than 4 characters and can't be longer than 50 characters.")

],productController.create);

/**
 * update routes
 * update products
 */
router.put('/products' , [
    body("name").notEmpty().withMessage('Product name is required')
        .trim()
        .isLength({min:4 , max:50 }).withMessage("Product can't be less than 4 characters and can't be longer than 50 characters.")
        .withMessage("Category title is required")
],upload.single("brand"),productController.update);


/**
 * delete brand
 * delete products
 */
router.delete('/prodcuts/:id' ,productController.delete);


module.exports = router