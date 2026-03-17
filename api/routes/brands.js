const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const brandController = require('../controllers/admin/brandController');
const brandValidation = require('../validation/brandValidation');

const { body } = require('express-validator');
const upload = require("../middleware/upload");

/**
 * index route
 * Get brand and SubCategories.jsx
 */
router.get('/brands' ,brandController.index);

/**
 * create routes
 * Create brand and sub-categories
 */
router.post('/brands' ,(req, res, next) => {
    req.uploadType = 'brands';
    next();

},upload.single('image') ,brandValidation, brandController.create);


/**
 * update routes
 * update brand and sub-categories
 */
router.put('/brands' ,(req, res, next) => {
    req.uploadType = 'brands';
    next();

},upload.single('image') ,brandValidation, brandController.update);

/**
 * delete brand
 * delete categories and sub-categories
 */
router.delete('/brands/:id' ,brandController.delete);


module.exports = router