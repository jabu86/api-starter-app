const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const indexController = require('../controllers/index');
const shippingValidator = require('../validation/shippingValidation')
    

//index route
router.get('/' ,indexController.index);
// define the home page route
router.get('/home', indexController.home);
// define the about route
router.get('/about', indexController.about);
// define the contact route
router.get('/contact', indexController.contact);
router.get('/shop', indexController.products);
router.get('/shop/:slug', indexController.product);
router.get('/shipping',   authMiddleware, indexController.shipping);
router.post('/shipping', shippingValidator,  authMiddleware, indexController.addShippingAddress);
router.post('/shipping/:id/edit', shippingValidator,  authMiddleware, indexController.editShippingAddress);
router.post('/shipping/:id/delete', authMiddleware, indexController.deleteShippingAddress);
router.post('/shipping/:id/update', authMiddleware, indexController.updateDefaultValute);

module.exports = router