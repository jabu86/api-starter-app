const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const brandController = require('../controllers/brandController');
const subCategoriesController = require('../controllers/subCategoryController');
const { body } = require('express-validator');
const upload = require("../middleware/upload");

/**
 * index route
 * Get brand and SubCategories
 */
router.get('/brands' ,brandController.index);

/**
 * create routes
 * Create brand and sub-categories
 */
router.post('/brands' ,upload.single("brand"),[
    body("name").notEmpty().withMessage('Brand name is required')
        .trim()
        .isLength({min:4 , max:50 }).withMessage("Brand can't be less than 4 characters and can't be longer than 50 characters.")

],brandController.create);

/**
 * update routes
 * update brand and sub-categories
 */
router.put('/brands' , [
    body("name").notEmpty().withMessage('Brand name is required')
        .trim()
        .isLength({min:4 , max:50 }).withMessage("Brand can't be less than 4 characters and can't be longer than 50 characters.")
        .withMessage("Category title is required")
],upload.single("brand"),brandController.update);


/**
 * delete brand
 * delete categories and sub-categories
 */
router.delete('/brands/:id' ,brandController.delete);


module.exports = router