const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const categoriesController = require('../controllers/admin/categoryController');
const subCategoriesController = require('../controllers/admin/subCategoryController');
const { body } = require('express-validator');
const validateCategory  = require('../validation/categoryValidation');
//index route
//Get Categories and SubCategories.jsx
router.get('/categories' ,categoriesController.index);
router.get('/categories/:slug' ,categoriesController.category);
router.get('/sub-categories' ,subCategoriesController.index);

/**
 * create routes
 * Create categories and sub-categories
 */
router.post('/categories' , validateCategory, categoriesController.create);
router.post('/sub-categories' , validateCategory, subCategoriesController.create);

/**
 * update routes
 * update categories and sub-categories
 */
router.post('/categories/:id' , validateCategory, categoriesController.update);
router.post('/sub-categories/:id', validateCategory, subCategoriesController.update);

/**
 * delete routes
 * delete categories and sub-categories
 */
router.delete('/categories/:id' ,categoriesController.delete);
router.delete('/sub-categories/:id' ,subCategoriesController.delete);


module.exports = router