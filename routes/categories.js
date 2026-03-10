const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const categoriesController = require('../controllers/categoryController');
const subCategoriesController = require('../controllers/subCategoryController');
//index route
router.get('/categories' ,categoriesController.index);
router.get('/sub-categories' ,subCategoriesController.index);

module.exports = router