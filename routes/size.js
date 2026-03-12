const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const sizeController = require('../controllers/sizeController');
const { body } = require('express-validator');

/**
 * index route
 * Get all sizes
 */
router.get('/size' ,sizeController.index);

/**
 * create routes
 * Create size
 */
router.post('/size' ,[
    body("name").notEmpty().withMessage('Size name is required')
        .trim()
        .isLength({min:2 , max:50 }).withMessage("Size can't be less than 2 characters and can't be longer than 50 characters.")
],sizeController.create);

/**
 * update routes
 * update size
 */
router.put('/size' , [
    body("name").notEmpty().withMessage('Size name is required')
        .trim()
        .isLength({min:2 , max:50 }).withMessage("Size can't be less than 2 characters and can't be longer than 50 characters.")
],sizeController.update);


/**
 * delete brand
 * delete products
 */
router.delete('/size/:id' ,sizeController.delete);

module.exports = router