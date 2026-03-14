const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const sizeController = require('../controllers/admin/sizeController');
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
    body("size").trim().notEmpty().withMessage('Size is required')
],sizeController.create);

/**
 * update routes
 * update size
 */
router.post('/size/:id' , [
    body("size").trim().notEmpty().withMessage('Size is required')
],sizeController.update);


/**
 * delete brand
 * delete products
 */
router.delete('/size/:id' ,sizeController.delete);

module.exports = router