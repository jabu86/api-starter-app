const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/auth/authController');
const {
    loginValidation,
    registerValidation,
    forgotValidation,
    resetValidation
} = require('../validation/authValidation');
//login route
router.post('/login', loginValidation, authController.login);

//Register route
router.post('/register',registerValidation, authController.register);

//Forgot password route
router.post('/forgot-password/',forgotValidation, authController.forgotPassword);
router.post('/reset-password/:token',authController.resetPassword);

router.post('/logout',resetValidation, authController.logout);
module.exports = router