const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/auth/authController');
//login route
router.post('/login',authController.login);

//Register route
router.post('/register',authController.register);

//Forgot password route
router.post('/forgot-password/',authController.forgotPassword);
router.post('/reset-password/:token',authController.resetPassword);

router.post('/logout',authController.logout);
module.exports = router