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
router.get('/categories', authMiddleware, roleMiddleware('admin', 'user'), categoriesController.index);
router.get('/categories/:slug', authMiddleware, roleMiddleware('admin', 'user') ,categoriesController.category);
router.get('/sub-categories', authMiddleware, roleMiddleware('admin', 'user'),subCategoriesController.index);

/**
 * create routes
 * Create categories and sub-categories
 */
router.post('/categories' , authMiddleware, roleMiddleware('admin', 'user'),validateCategory, categoriesController.create);
router.post('/sub-categories' , authMiddleware, roleMiddleware('admin', 'user'), validateCategory, subCategoriesController.create);

/**
 * update routes
 * update categories and sub-categories
 */
router.post('/categories/:id' , authMiddleware, roleMiddleware('admin', 'user'), validateCategory, categoriesController.update);
router.post('/sub-categories/:id', authMiddleware, roleMiddleware('admin', 'user'), validateCategory, subCategoriesController.update);

/**
 * delete routes
 * delete categories and sub-categories
 */
router.delete('/categories/:id', authMiddleware, roleMiddleware('admin', 'user'), categoriesController.delete);
router.delete('/sub-categories/:id',authMiddleware, roleMiddleware('admin', 'user'), subCategoriesController.delete);


module.exports = router