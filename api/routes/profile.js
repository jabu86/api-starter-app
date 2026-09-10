const express = require('express')
const upload = require("../middleware/upload");
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const profileController = require('../controllers/admin/profileController');
const {validateProfile , validateProfileUserPassword} = require('../validation/profileValidation');
// const validateProfileUserPassword = require('../validation/profileValidation');

//index route
router.get('/profile', authMiddleware, roleMiddleware('admin' , 'user' , 'customer') ,profileController.index);


router.post('/profile' ,(req, res, next) => {
    req.uploadType = 'profile';
    next();

},upload.single('image') ,validateProfile,authMiddleware, roleMiddleware('admin' , 'user' , 'customer') ,profileController.profileUpdate);

router.post('/profile-reset-password',validateProfileUserPassword, authMiddleware, roleMiddleware('admin' , 'user' , 'customer') ,profileController.profilePasswordReset);


module.exports = router
