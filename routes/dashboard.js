const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const dashboardController = require('../controllers/dashboardController');
//index route
router.get('/dashboard', authMiddleware, roleMiddleware('admin') ,dashboardController.index);


module.exports = router