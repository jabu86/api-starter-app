const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const usersController = require('../controllers/admin/usersController');
//index route
router.get('/users', authMiddleware, roleMiddleware('admin', 'user') , usersController.index);
router.get('/user/assign-role', authMiddleware, roleMiddleware('admin') , usersController.assignRole);


module.exports = router