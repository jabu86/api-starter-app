const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const categoriesController = require('../controllers/admin/categoryController');
const subCategoriesController = require('../controllers/admin/subCategoryController');
const { body } = require('express-validator');
//index route
//Get Categories and SubCategories
router.get('/categories' ,categoriesController.index);
router.get('/sub-categories' ,subCategoriesController.index);

/**
 * create routes
 * Create categories and sub-categories
 */
router.post('/categories' ,  [
    body("name").notEmpty()
        .trim()
        .isLength({min:5 , max:50 }).withMessage("Category can't be less than 4 characters and can't be longer than 50 characters.")
        .withMessage("Category title is required")
],categoriesController.create);
router.post('/sub-categories' ,[
    body("name").notEmpty()
        .trim()
        .isLength({min:5 , max:50 }).withMessage("Sub category can't be less than 4 characters and can't be longer than 50 characters.")
        .withMessage("Sub category title is required")
],subCategoriesController.create);

/**
 * update routes
 * update categories and sub-categories
 */
router.post('/categories/:id' , [
    body("name").notEmpty()
        .trim()
        .isLength({min:5 , max:50 }).withMessage("Category can't be less than 4 characters and can't be longer than 50 characters.")
        .withMessage("Category title is required")
],categoriesController.update);
router.post('/sub-categories/:id',[
    body("name").notEmpty()
        .trim()
        .isLength({min:5 , max:50 }).withMessage("Category can't be less than 4 characters and can't be longer than 50 characters.")
        .withMessage("Category title is required")
] ,subCategoriesController.update);

/**
 * delete routes
 * delete categories and sub-categories
 */
router.delete('/categories/:id' ,categoriesController.delete);
router.delete('/sub-categories/:id' ,subCategoriesController.delete);


module.exports = router