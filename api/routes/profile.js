const express = require('express')
const upload = require("../middleware/upload");
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const profileController = require('../controllers/admin/profileController');
const validateProfile = require('../validation/profileValidation');

//index route
router.get('/profile', authMiddleware, roleMiddleware('admin' , 'user') ,profileController.index);


router.post('/profile' ,(req, res, next) => {
    req.uploadType = 'profile';
    next();

},upload.single('image') ,validateProfile,authMiddleware, roleMiddleware('admin' , 'user') ,profileController.profileUpdate);


module.exports = router