const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const indexController = require('../controllers/index');
//index route
router.get('/', authMiddleware ,indexController.index);

// define the home page route
router.get('/home', indexController.home);
// define the about route
router.get('/about', indexController.about);
module.exports = router