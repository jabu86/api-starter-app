const express = require('express')
const router = express.Router()
// const authMiddleware = require('../middleware/authMiddleware');
const indexController = require('../controllers/index');
//index route
router.get('/' ,indexController.index);
// define the home page route
router.get('/home', indexController.home);
// define the about route
router.get('/about', indexController.about);
// define the contact route
router.get('/contact', indexController.contact);
module.exports = router