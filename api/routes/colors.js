const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const colorsController = require('../controllers/admin/colorsController');

const { body } = require('express-validator');
//index route
//Get Categories and SubCategories
router.get('/colors' ,colorsController.index);

/**
 * create routes
 * Create categories and sub-categories
 */
router.post('/colors' ,  [
    body("name").notEmpty().withMessage('Color name is required')
        .trim()
        .isLength({min:3 , max:50 }).withMessage("Color can't be less than 4 characters and can't be longer than 50 characters.")
],colorsController.create);

/**
 * update routes
 * update categories and sub-categories
 */
router.post('/colors/:id' , [
    body("name").notEmpty().withMessage('Color name is required')
        .trim()
        .isLength({min:3 , max:50 }).withMessage("Color can't be less than 4 characters and can't be longer than 50 characters.")
],colorsController.update);

/**
 * delete routes
 * delete categories and sub-categories
 */
router.delete('/colors/:id' ,colorsController.delete);
;


module.exports = router